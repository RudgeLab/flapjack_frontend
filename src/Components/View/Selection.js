import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, useHistory } from 'react-router-dom'
import { Collapse, Button, Layout, message, Form } from 'antd'
import ProviderSelection from './ProviderSelection'
import PlotOptions from './PlotOptions'
import AnalysisSelection from './AnalysisSelection'
import api from '../../api'

/** Renders the query form for plot creation */
const Selection = ({ isAnalysis = false, onSubmit }) => {
  const location = useLocation()
  const history = useHistory()

  // Query
  const [selectedStudies, setSelectedStudies] = React.useState([])
  const [selectedAssays, setSelectedAssays] = React.useState([])
  const [selectedVectors, setSelectedVectors] = React.useState([])
  const [selectedMedia, setSelectedMedia] = React.useState([])
  const [selectedStrain, setSelectedStrain] = React.useState([])

  const [analysisForm] = Form.useForm()

  // Set initial values based on url query parameters
  React.useEffect(() => {
    if (location.state) {
      const { study, assay, vector } = location.state
      if (study) setSelectedStudies([study])
      if (assay) setSelectedAssays([assay])
      if (vector) setSelectedVectors([vector])
      history.replace({
        pathname: location.pathname,
        state: null,
      })
    }
  }, [location, history])

  const addSelected = (value, checked, setSelected) => {
    if (checked) {
      setSelected((selected) => [...selected.filter(({ id }) => id !== value.id), value])
    } else {
      setSelected((selected) => selected.filter(({ id }) => id !== value.id))
    }
  }

  // Select a study an all related assays
  const setStudiesAndChildAssays = async (value, checked) => {
    addSelected(value, checked, setSelectedStudies)
    if (!checked) return

    api
      .get('assay', null, {
        study: value.id,
      })
      .then(({ results }) =>
        results.reduce((acc, value) => {
          return { ...acc, [value.id]: value }
        }, {}),
      )
      .then((res) =>
        Promise.all(
          Object.entries(res).forEach(([, value]) =>
            // setAssaysAndChildDNA({ id: +id, name: value.name }, true),
            addSelected(value, true, setSelectedAssays),
          ),
        ),
      )
      .catch(() => null)
  }

  // const setAssaysAndChildDNA = async (value, checked) => {
  //   addSelected(value, checked, setSelectedAssays)
  //   if (!checked) return

  //   api
  //     .get('dna', null, { assays: value.id })
  //     .then(({ results }) =>
  //       results.reduce((acc, value) => {
  //         value.name = value.names.join(', ')
  //         return { ...acc, [value.id]: value }
  //       }, {}),
  //     )
  //     .then((res) =>
  //       setSelectedVectors((selected) => [
  //         ...selected.filter(({ id }) => !res[id]),
  //         ...Object.values(res),
  //       ]),
  //     )
  //     .catch(() => null)
  // }

  const queryFields = [
    {
      url: 'study',
      label: 'studies',
      header: 'Studies',
      selected: selectedStudies,
      _selectedSetter: setSelectedStudies,
      setSelected: setStudiesAndChildAssays,
    },
    {
      url: 'assay',
      label: 'assays',
      header: 'Assays',
      selected: selectedAssays,
      _selectedSetter: setSelectedAssays,
      setSelected: (value, checked) => addSelected(value, checked, setSelectedAssays),
      // setSelected: setAssaysAndChildDNA,
    },
    {
      url: 'vector',
      label: 'Vectors',
      header: 'Vector',
      selected: selectedVectors,
      _selectedSetter: setSelectedVectors,
      setSelected: (value, checked) => addSelected(value, checked, setSelectedVectors),
    },
    {
      url: 'strain',
      label: 'Strains',
      header: 'Strain',
      selected: selectedStrain,
      _selectedSetter: setSelectedStrain,
      setSelected: (value, checked) => addSelected(value, checked, setSelectedStrain),
    },
    {
      url: 'media',
      label: 'Media',
      header: 'Media',
      selected: selectedMedia,
      _selectedSetter: setSelectedMedia,
      setSelected: (value, checked) => addSelected(value, checked, setSelectedMedia),
    },
  ]

  // Plot Options
  const [normalize, setNormalize] = React.useState('None')
  const [subplots, setSubplots] = React.useState('Signal')
  const [markers, setMarkers] = React.useState('Vector')
  const [plot, setPlot] = React.useState('Mean +/- std')

  const plotOptionsFields = [
    {
      name: 'Normalize',
      options: ['Temporal Mean', 'Mean/std', 'Min/Max', 'None'],
      selected: normalize,
      setSelected: setNormalize,
      defaultValue: 'None',
    },
    {
      name: 'Subplots',
      options: ['Study', 'Assay', 'Vector', 'Media', 'Strain', 'Supplement', 'Signal'],
      selected: subplots,
      setSelected: setSubplots,
      defaultValue: 'Signal',
    },
    {
      name: 'Lines/Markers',
      options: ['Study', 'Assay', 'Vector', 'Media', 'Strain', 'Supplement', 'Signal'],
      selected: markers,
      setSelected: setMarkers,
      defaultValue: 'Vector',
    },
    {
      name: 'Plot',
      options: ['Mean', 'Mean +/- std', 'All data points'],
      selected: plot,
      setSelected: setPlot,
      defaultValue: 'Mean +/- std',
    },
  ]

  const renderClear = (selected, setter) => (
    <Button
      disabled={!selected.length}
      onClick={(e) => {
        e.stopPropagation()
        setter([])
      }}
      size="small"
      type="danger"
    >
      Clear
    </Button>
  )

  const onPlot = async () => {
    let form = {
      studyIds: selectedStudies.map(({ id }) => id),
      assayIds: selectedAssays.map(({ id }) => id),
      vectorIds: selectedVectors.map(({ id }) => id),
      strainIds: selectedStrain.map(({ id }) => id),
      mediaIds: selectedMedia.map(({ id }) => id),
    }

    if (!Object.values(form).some((val) => val.length)) {
      message.warn('Please select data to plot.')
      return
    }

    form.plotOptions = { normalize, subplots, markers, plot }

    if (isAnalysis) {
      const analysisValues = await analysisForm.validateFields().catch(() => {
        message.error('Please fill the fields in the analysis form.')
        return null
      })

      if (!analysisValues) return
      form = { ...form, analysis: analysisValues }
    }

    onSubmit(form)
  }

  return (
    <Layout>
      <Layout.Content>
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel header="Query" key="1">
            <Collapse>
              {queryFields.map((field) => (
                <Collapse.Panel
                  key={field.label}
                  header={field.header}
                  extra={renderClear(field.selected, field._selectedSetter)}
                >
                  <ProviderSelection {...field} />
                </Collapse.Panel>
              ))}
            </Collapse>
          </Collapse.Panel>
          {isAnalysis && (
            <Collapse.Panel header="Analysis" key="2" forceRender>
              <AnalysisSelection formInstance={analysisForm} />
            </Collapse.Panel>
          )}
          <Collapse.Panel header="Plot Options" key="3">
            <PlotOptions fields={plotOptionsFields} />
          </Collapse.Panel>
        </Collapse>
      </Layout.Content>
      <Layout.Footer style={{ padding: 0 }}>
        <Button type="primary" onClick={onPlot} block>
          Plot
        </Button>
      </Layout.Footer>
    </Layout>
  )
}

Selection.propTypes = {
  isAnalysis: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
}

export default Selection
