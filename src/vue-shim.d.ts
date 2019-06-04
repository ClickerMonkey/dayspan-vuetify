import Vue from "vue";

declare module "*.vue" {
  export default Vue;
}

declare module 'vue/types/vue' {

  export interface VueConstructor {
    $dayspan: any;
  }

  export interface Vue   {
  
    $dayspan: any;

    $dsValidate<K extends keyof this> (input: any, key: K): this[K];

    $dsDefaults (): { [K in keyof this]: this[K] };
    
  }
}