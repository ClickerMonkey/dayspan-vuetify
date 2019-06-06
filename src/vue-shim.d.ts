import Vue from "vue";
import { VPluginOptions } from './types';

declare module "*.vue" {
  export default Vue;
}

declare module 'vue/types/vue' {

  export interface VueConstructor {
    $dayspan: VPluginOptions;
  }

  export interface Vue   {
  
    $dayspan: VPluginOptions;

    $dsValidate<K extends keyof this> (input: any, key: K): this[K];

    $dsDefaults (): { [K in keyof this]: this[K] };
    
  }
}