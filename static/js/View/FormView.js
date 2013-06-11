(function(App) {

    function FormView(opts) {

        var view = new App.View(opts),
            model = view.model,
            el = view.el;

            view.getFieldValues = function getFieldValues() {

                var fields = model.get('fields'),
                    values = {};

                for(var field in fields) {
                    values[field] = el.find('#' + field).val();
                }

                return values;

            };

            view.bindErrors = function bindErrors() {

                var fields = model.get('fields');

                for(var field in fields) {
                    var $field = el.find('#' + field);
                    view.bindError(field, $field);
                }

                App.subscribe('validationError', function() {
                    view.el.find('#submit').hide();
                    view.el.find('#forceSubmit').show();
                });

            };

            view.bindError = function bindError(field, $field) {

                App.subscribe('validationError:' + field, function(_, errorMessage) {

                    var $errMsg = $('<span>', { 'class': 'fieldError' });
                    $errMsg.text(errorMessage);

                    $field.addClass('error').after($errMsg);
                });

            };

            view.resetForm = function resetForm() {
                el.find('#reset').trigger('click');
            };

            el.on('submit', function(e) {
                e.preventDefault();

                var values = view.getFieldValues();
                view.resetForm();
                App.publish('submit:party', [values]);
            });

            el.find('#forceSubmit').on('click', function(e) {
                e.preventDefault();

                var values = view.getFieldValues();
                view.resetForm();
                App.publish('newParty', [values]);
            });

            el.on('reset', function() {
                el.find('#forceSubmit').hide();
                el.find('#submit').show();
                el.find('.error').removeClass('error');
                el.find('.fieldError').remove();
            });

            el.attr('novalidate', true);

        return view;
    }

    App.FormView = FormView;

} (App));
