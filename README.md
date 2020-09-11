# vue-perfect-print
This is a simple and fast component for printing the local content of the page.
## Install
```
npm install vue-perfect-print
```

```
import VuePerfectPrint from 'vue-perfect-print'

Vue.use(VuePerfectPrint);
```
## Run demo
```
<template>
    <div>
        <button @click="print">click print</button>
    </div>
</template>

<script>
    export default {
        methods:{
            print(){
                this.perfectPrint({
                    content: "<h1>打印</h1>"
                });
            }
        }
    }
</script>
```
### Parameter description

Parameter | Required | Description
----|------|----
id | false  | ID of the print window
content | true  | Print content, support HTML and text
showHeaderFooter | false  | Display page and footer, default false
