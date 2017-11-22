export type ShapeType = 'circle' | 'square' | 'tab'
export type LayoutType = 'vertical' | 'horizontal'
export type StepSizeType = 'xs' | 'sm' | 'md' | 'lg'

export declare class Wizard {
  /** Wizard title */
  title: string
  /** Wizard subtitle */
  subtitle: string
  nextButtonText: string
  backButtonText: string
  finishButtonText: string
  /** Whether to hide footer buttons */
  hideButtons: boolean
  /** Whether to trigger beforeChange function when navigating back */
  validateOnBack: boolean
  /** Active step and button color */
  color: string
  /** Step color when the current step is not valid */
  errorColor: string
  /** Main step shape */
  shape: ShapeType
  /** Wizard layout */
  layout: LayoutType
  /** Additional css classes for steps */
  stepsClasses: string[]
  /** Step size */
  stepSize: StepSizeType
  /** Step transition from inactive to active */
  transition: string
  /** Tab index where the wizard should start */
  startIndex: number
}
