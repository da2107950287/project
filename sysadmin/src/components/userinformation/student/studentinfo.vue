<template>
  <div>
    <div>
      <ul class="content">
        <li>
          <div>账号:</div>
          <div>123456</div>
        </li>
        <li>
          <div>姓名:</div>
          <div>123456</div>
        </li>
        <li>
          <div>密码:</div>
          <div>123456</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.content {
  li {
    list-style: none;
    display: flex;
    justify-content: center;
    line-height: 30px;
    margin-bottom: 10px;
    div:first-child{
        color:#333
    }
    div:last-child{
            color: #707070;
            margin-left:10px;
    }
  }
}
</style>