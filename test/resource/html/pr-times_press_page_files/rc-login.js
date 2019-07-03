$(function() {
    var process = false;
    var form_id;
    var rc_login = function (promise, params) {
        $.ajax({
            type: 'post',
            timeout: 3000,
            crossDomain: true,
            dataType: "json",
            url: params.url + "/api/signin",
            data: {
                "company_user": {"remember_token": params.token, "iv": params.iv}
            },
            xhrFields: {
                withCredentials: true
            }
        }).done(function (msg) {
            if (msg.status.status_code == 200) {
                var token = msg.status.value.company_user.remember_token;
                $('<input>').attr({'type': 'hidden', 'name': 'remember_token'}).val(token).appendTo(form_id);
            }
        }).always(function() {
            process = false;
            promise.resolve();
        });
    };

    var rc_login_request = function () {
        var promise = new $.Deferred;
        if (process) {
            return;
        }
        process = true;
        $.ajax({
            type: 'post',
            timeout: 3000,
            crossDomain: true,
            url: 'https://'+ location.host + '/api/rc/encrypt_password',
            data: {mail: $('input[name=mail]').val(), pass: $('input[name=pass]').val(), from_protocol: location.protocol},
            xhrFields: {
                withCredentials: true
            }
        }).done(function(result) {
            if (result.status.status_code == 200) {
                rc_login(promise, {url: result.data.target_url, token: result.data.remember_token, iv: result.data.iv});
            } else {
                promise.resolve();
            }
        }).fail(function() {
            promise.resolve();
        });
        return promise;
    };

    var rc_login_execute = function (id) {
        form_id = '#' + id;
        return rc_login_request();
    };
    
    $(document).on('click', '#btn-login', function(event) {
        event.preventDefault();
        rc_login_execute($(this).parents('form').attr('id')).then(function() {
            $(form_id).submit();
            return false;
        });
    });

    var enter_submit_target_elems = [
        "#login-form input[name=mail]",
        "#login-form-modal input[name=mail]",
        "#login-form input[name=pass]",
        "#login-form-modal input[name=pass]"
    ];

    for (var i = 0; i < enter_submit_target_elems.length; i++) {
        $(document).on('keypress', enter_submit_target_elems[i], function(event) {
            if (event.which == 13) {
                event.preventDefault();
                rc_login_execute($(this).parents('form').attr('id')).then(function() {
                    $(form_id).submit();
                    return false;
                });
            }
        });
    }
});
