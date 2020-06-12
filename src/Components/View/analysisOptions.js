import { Input, Checkbox, Radio } from 'antd'

const analysisOptions = {
  'Mean Expression': [
    {
      name: 'bg_correction',
      label: 'Std. Devs',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 2,
      renderer: Input,
    },
    {
      name: 'min_density',
      label: 'Min. Density',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 0.05,
      renderer: Input,
    },
    {
      name: 'density_name',
      label: 'Density Name',
      renderer: Input,
    },
    {
      name: 'remove_data',
      label: 'Remove Data',
      showLabel: true,
      valuePropName: 'checked',
      initial_value: false,
      renderer: Checkbox,
    },
  ],
  'Mean Expression Ratio': [
    {
      name: 'bg_correction',
      label: 'Std. Devs',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 2,
      renderer: Input,
    },
    {
      name: 'min_density',
      label: 'Min. Density',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 0.05,
      renderer: Input,
    },
    {
      name: 'ref_name',
      label: 'Reference Name',
      renderer: Input,
    },
    {
      name: 'density_name',
      label: 'Density Name',
      renderer: Input,
    },
    {
      name: 'remove_data',
      label: 'Remove Data',
      showLabel: true,
      valuePropName: 'checked',
      initial_value: false,
      renderer: Checkbox,
    },
  ],
  'Mean Expression Rate': [
    {
      name: 'bg_correction',
      label: 'Std. Devs',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 2,
      renderer: Input,
    },
    {
      name: 'min_density',
      label: 'Min. Density',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 0.05,
      renderer: Input,
    },
    {
      name: 'density_name',
      label: 'Density Name',
      renderer: Input,
    },
    {
      name: 'remove_data',
      label: 'Remove Data',
      showLabel: true,
      valuePropName: 'checked',
      initial_value: false,
      renderer: Checkbox,
    },
  ],
  'Mean Expression Rate Ratio': [
    {
      name: 'bg_correction',
      label: 'Std. Devs',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 2,
      renderer: Input,
    },
    {
      name: 'min_density',
      label: 'Min. Density',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 0.05,
      renderer: Input,
    },
    {
      name: 'ref_name',
      label: 'Reference Name',
      renderer: Input,
    },
    {
      name: 'density_name',
      label: 'Density Name',
      renderer: Input,
    },
    {
      name: 'remove_data',
      label: 'Remove Data',
      showLabel: true,
      valuePropName: 'checked',
      initial_value: false,
      renderer: Checkbox,
    },
  ],
  'Mean Velocity': [
    {
      name: 'pre_smoothing',
      label: 'Initial Smoothing',
      type: 'number',
      step: 0.01,
      rules: [{ required: true }],
      initial_value: 21.0,
      renderer: Input,
    },
    {
      name: 'post_smoothing',
      label: 'Final Smoothing',
      type: 'number',
      step: 0.01,
      rules: [{ required: true }],
      initial_value: 21.0,
      renderer: Input,
    },
  ],
  'Max Velocity': [
    {
      name: 'pre_smoothing',
      label: 'Initial Smoothing',
      type: 'number',
      step: 0.01,
      rules: [{ required: true }],
      initial_value: 21.0,
      renderer: Input,
    },
    {
      name: 'post_smoothing',
      label: 'Final Smoothing',
      type: 'number',
      step: 0.01,
      rules: [{ required: true }],
      initial_value: 21.0,
      renderer: Input,
    },
  ],
  Velocity: [
    {
      name: 'pre_smoothing',
      label: 'Initial Smoothing',
      type: 'number',
      step: 0.01,
      rules: [{ required: true }],
      initial_value: 21.0,
      renderer: Input,
    },
    {
      name: 'post_smoothing',
      label: 'Final Smoothing',
      type: 'number',
      step: 0.01,
      rules: [{ required: true }],
      initial_value: 21.0,
      renderer: Input,
    },
  ],
  'Expression Rate (indirect)': [
    {
      name: 'pre_smoothing',
      label: 'Initial Smoothing',
      type: 'number',
      step: 0.01,
      rules: [{ required: true }],
      initial_value: 21.0,
      renderer: Input,
    },
    {
      name: 'post_smoothing',
      label: 'Final Smoothing',
      type: 'number',
      step: 0.01,
      rules: [{ required: true }],
      initial_value: 21.0,
      renderer: Input,
    },
    {
      name: 'bg_correction',
      label: 'Std. Devs',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 2,
      renderer: Input,
    },
    {
      name: 'min_density',
      label: 'Min. Density',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 0.05,
      renderer: Input,
    },
    {
      name: 'density_name',
      label: 'Density Name',
      renderer: Input,
    },
    {
      name: 'remove_data',
      label: 'Remove Data',
      showLabel: true,
      valuePropName: 'checked',
      initial_value: false,
      renderer: Checkbox,
    },
  ],
  'Expression Rate (direct)': [
    {
      name: 'degr',
      label: 'Reporter Degradation Rate (per hour)',
      type: 'number',
      step: 0.0001,
      rules: [{ required: true }],
      initial_value: 0.0,
      renderer: Input,
    },
    {
      name: 'eps_L',
      label: 'Insignificant Value',
      type: 'number',
      step: 0.01,
      rules: [{ required: true }],
      initial_value: 1e-7,
      renderer: Input,
    },
    {
      name: 'bg_correction',
      label: 'Std. Devs',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 2,
      renderer: Input,
    },
    {
      name: 'min_density',
      label: 'Min. Biomass',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 0.05,
      renderer: Input,
    },
    {
      name: 'density_name',
      label: 'Density Name',
      renderer: Input,
    },
    {
      name: 'remove_data',
      label: 'Remove Data',
      showLabel: true,
      valuePropName: 'checked',
      initial_value: false,
      renderer: Checkbox,
    },
  ],
  Rho: [
    {
      name: 'bg_correction',
      label: 'Std. Devs',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 2,
      renderer: Input,
    },
    {
      name: 'min_density',
      label: 'Min. Density',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 0.05,
      renderer: Input,
    },
    {
      name: 'ref_name',
      label: 'Reference Name',
      rules: [{ required: true }],
      renderer: Input,
    },
    {
      name: 'density_name',
      label: 'Density Name',
      renderer: Input,
    },
    {
      name: 'remove_data',
      label: 'Remove Data',
      showLabel: true,
      valuePropName: 'checked',
      initial_value: false,
      renderer: Checkbox,
    },
  ],
  Alpha: [
    {
      name: 'bg_correction',
      label: 'Std. Devs',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 2,
      renderer: Input,
    },
    {
      name: 'min_density',
      label: 'Min. Density',
      type: 'number',
      rules: [{ required: true }],
      initial_value: 0.05,
      renderer: Input,
    },
    {
      name: 'ndt',
      label: 'Num. Doublings',
      type: 'number',
      initial_value: 2.0,
      rules: [{ required: true }],
      renderer: Input,
    },
    {
      name: 'density_name',
      label: 'Density Name',
      renderer: Input,
    },
    {
      name: 'remove_data',
      label: 'Remove Data',
      showLabel: true,
      valuePropName: 'checked',
      initial_value: false,
      renderer: Checkbox,
    },
  ],
  'Induction Curve': [
    {
      name: 'inducer',
      label: 'Inducer',
      options: ['Treonina'],
      renderer: Radio.Group,
      rules: [{ required: true }],
    },
    {
      name: 'measure',
      label: 'Function',
      options: [
        { label: 'Mean Expression', value: 'mean_expression' },
        { label: 'Mean Expression Ratio', value: 'mean_expression_ratio' },
        { label: 'Mean Expression Rate', value: 'mean_expression_rate' },
        { label: 'Mean Expression Rate Ratio', value: 'mean_expression_rate_ratio' },
      ],
      renderer: Radio.Group,
      rules: [{ required: true }],
    },
  ],
  Kymograph: [
    {
      name: 'inducer',
      label: 'Inducer',
      options: ['Treonina'],
      renderer: Radio.Group,
      rules: [{ required: true }],
    },
    {
      name: 'measure',
      label: 'Function',
      options: [
        { label: 'Expression Rate (direct)', value: 'exp_rate_dir' },
        { label: 'Expression Rate (indirect)', value: 'exp_rate_ind' },
      ],
      renderer: Radio.Group,
      rules: [{ required: true }],
    },
  ],
}

export default analysisOptions
