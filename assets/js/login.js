$(function () {
  //给登录设置点击"去注册事件"
  $('#link_reg').on('click', function () {
    $('.reg-box').show();
    $('.login-box').hide();
  });

  //给注册设置点击"去登录"事件
  $('#link_login').on('click', function () {
    $('.reg-box').hide();
    $('.login-box').show();
  });

  //从leyui拿到form对象
  const { form } = layui;
  const { layer } = layui;
  form.verify({
    //自定义了一个密码校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    //定义一个校验两次密码一致的规则
    repwd: function (value) {
      const pwd = $('.reg-box [name=password]').val();
      if (pwd !== value) {
        return '两次密码不一致';
      }
    }
  });

  //监听注册页面的submit事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      url: '/api/reguser',
      method: 'POST',
      data: {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
      },
      success: (res) => {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        $('#link_login').click();
      }
    });
  });

  //监听登录页面的submit事件
  $('#form_login').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      url: '/api/login',
      method: 'POST',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg('登录成功');
        localStorage.setItem('token', res.token);
        location.href = '/index.html';
      }
    });
  });
});
