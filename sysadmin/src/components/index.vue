<template>
    <ul>
        <li v-for="(item,index) in list" :key="index">{{item}}</li>
    </ul>
</template>
<script>
export default {
    data(){
        return{
            list:[
                {title:'待审核公司'},
                {title:'待审核招聘信息'},
                {title:'待审核培训信息'},
                {title:'待回复留言咨询'}

            ]
        }
    }
}
</script>