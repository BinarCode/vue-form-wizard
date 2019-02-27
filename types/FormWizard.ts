import Vue from 'vue'

export type ShapeType = 'circle' | 'square' | 'tab'
export type LayoutType = 'vertical' | 'horizontal'
export type StepSizeType = 'xs' | 'sm' | 'md' | 'lg'

export declare class Wizard extends Vue {
  /**
   * Wizard identifier.
   * 
   * Default value: 'fw_<timestamp-in-milliseconds>'
   */
  id: string

  /**
   * Wizard title.
   * 
   * Default value: 'Awesome Wizard'
   */
  title: string

  /**
   * Wizard subtitle.
   * 
   * Default value: 'Split a complicated flow in multiple steps'
   */
  subtitle: string

  /**
   * Text to display on next button.
   * 
   * Default value: 'Next'
   */
  nextButtonText: string

  /**
   * Text to display on back button.
   * 
   * Default value: 'Back'
   */
  backButtonText: string

  /**
   * Text to display on finish button.
   * 
   * Default value: 'Finish'
   */
  finishButtonText: string

  /**
   * Whether or not buttons should be hidden.
   * 
   * Default value: false
   */
  hideButtons: boolean

  /**
   * Whether or not to trigger `beforeChange` function when navigating back.
   * 
   * Default value: false
   */
  validateOnBack: boolean

  /**
   * Color to apply to text, border and circle.
   * 
   * Default value: '#e74c3c'
   */
  color: string

  /**
   * Step color when the current step is not valid.
   * 
   * Default value: '#8b0000'
   */
  errorColor: string

  /**
   * Shape of steps.
   * 
   * Default value: 'circle'
   */
  shape: ShapeType

  /**
   * Layout of wizard.
   * 
   * Default value: 'horizontal'
   */
  layout: LayoutType

  /**
   * Additional CSS classes to apply to steps.
   * 
   * Default value: ''
   */
  stepsClasses: string[]

  /**
   * Size of steps.
   * 
   * Default value: 'md'
   */
  stepSize: StepSizeType

  /**
   * Name of the transition when transitioning between steps.
   * 
   * Default value: ''
   */
  transition: string

  /**
   * Zero-based index of the initial tab to be displayed.
   * 
   * Default value: 0
   */
  startIndex: number

  /**
   * Resets the wizard to its initial state.
   */
  reset: () => void

  /**
   * Activates all steps, as if the user has navigated to each of them.
   */
  activateAll: () => void

  /**
   * Navigates to the next tab.
   */
  nextTab: () => void

  /**
   * Navigates to the previous tab.
   */
  prevTab: () => void

  /**
   * Navigates from one tab to another. Note that this method does not trigger validaiton methods.
   */
  changeTab: (oldIndex: number, newIndex: number, emitChangeEvent?: boolean) => boolean
}
