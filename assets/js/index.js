$(function () {
  getUserInfo();
  //实现退出功能
  let layer = layui.layer;

  //给退出按钮绑定点击事件
  $('#btnLogout').on('click', function () {
    // 提示用户是否确认退出
    layer.confirm(
      '确定退出登录?',
      { icon: 3, title: '提示' },
      function (index) {
        //do something
        // 1. 清空本地存储中的 token
        localStorage.removeItem('token');
        // 2. 重新跳转到登录页面
        location.href = '/login.html';

        // 关闭 confirm 询问框
        layer.close(index);
      }
    );
  });
});

//封装一个获取用户信息的函数
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    //请求头
    // headers: {
    //   Authorization: localStorage.getItem('token')
    // },
    success(res) {
      if (res.status !== 0) {
        return layui.layer.msg(res.message);
      }
      //调用渲染用户头像
      renderAvatar(res.data);
    },
    error(err) {}
  });
}
//封装一个渲染用户头像的函数
function renderAvatar(user) {
  //1.获取用户的昵称
  const name = user.nickname || user.username;
  //2.设置欢迎的文本
  $('#welcome').html('欢迎&nbsp&nbsp' + name);
  //3.按需渲染用户的头像
  if (user.pic !== null) {
    $('.layui-nav-img').attr('src', user.userpic).show();
    $('.text-avatar').hide();
  }

  const first = name[0].toUpperCase();
  $('.layui-nav-img').hide();
  $('.text-avatar').html(first).show();
}
