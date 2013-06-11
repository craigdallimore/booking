(function(App) {

    function View(config) {
        for(var attr in config) {
            this[attr] = config[attr];
        }
    }

    View.prototype.render = function() {
        if (!this.el) {
            this.el = document.createElement(this.tagName || 'div');
            this.el.className = this.className || '';
        }
        if (this.template) {
            var JSON = this.model.toJSON();
            this.el.innerHTML = '';
            this.el.appendChild(this.template(JSON));
        }
        return this;
    };

    App.View = View;


}(App));


