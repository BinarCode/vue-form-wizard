import Vue from 'vue'

export declare class Step extends Vue {
  /** Tab component for the step. This should be usually passed through the `step` scoped slot */
  tab: object
  transition: string
  index: number
}
