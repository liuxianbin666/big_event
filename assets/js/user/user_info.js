$(function () {
  let { form } = layui;
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称必须小于6位';
      }
    }
  });
  //监听表单的提交事件
  $('.layui-form').on('submit', function (e) {
    e.preventDefault();
    //发起ajax数据请求
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.msg('更新用户信息失败');
        }
        layer.msg('更新用户信息成功');
        //调用父页面的方法  window.parent.方法名
        window.parent.getUserInfo();
      }
    });
  });

  initUserInfo();
  //初始化用户的基本信息
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败');
        }
        form.val('formUserInfo', res.data);
      }
    });
  }

  //给重置按钮设置点击事件
  $('#btnReset').on('click', function (e) {
    e.preventDefault();
    initUserInfo();
  });
});
