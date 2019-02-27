import Vue from 'vue'

export declare class Step extends Vue {
  /**
   * Tab component to use for the step. This should be usually passed through the `step` scoped slot.
   * 
   * Default value: () => {}
   */
  tab: object

  /**
   * Default value: ''
   */
  transition: string

  /**
   * Default value: 0
   */
  index: number
}
