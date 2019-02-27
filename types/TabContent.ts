import Vue from 'vue'

export declare class Tab extends Vue {
  /**
   * Title to be displayed under each step.
   * 
   * Default value: ''
   */
  title: string
  
  /** CSS class to be applied to each step icon.
   * 
   * Default value: ''
   */
  icon: string

  /**
   * Function to execute before changing tabs. If the return result is false, the tab switch is restricted.
   */
  beforeChange: () => boolean | Promise<boolean>

  /**
   * Function to execute after changing tabs. It is safe to assume that necessary validation has already occurred.
   */
  afterChange: () => void

  /**
   * Vue router route object.
   */
  route: string | object

  /**
   * Default value: () => {}
   */
  additionalInfo: object
}
