import Vue from 'vue'

export declare class Tab extends Vue {
  /** Title to be displayed under each step */
  title?: string
  /** css class for each step icon */
  icon?: string
  /***
   * Function to execute before tab switch. Return value must be boolean
   * If the return result is false, tab switch is restricted
   */
  beforeChange (): boolean | Promise<boolean>
  /** Vue router route object */
  route: string | object
  additionalInfo: object
}
