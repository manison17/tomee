/**
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function () {
    'use strict';

    var deps = ['app/js/templates', 'app/js/i18n', 'lib/backbone', 'lib/javascript-mode', 'lib/groovy-mode'];
    define(deps, function (templates, i18n) {
        var codeMirror = CodeMirror; //making lint happy
        codeMirror.commands.autocomplete = function (cm) {
            codeMirror.showHint(cm, codeMirror.hint.anyword);
        };

        var codes = {
            javascript: templates.getValue('script-sample-javascript', {}),
            groovy: templates.getValue('script-sample-groovy', {})
        };

        var View = Backbone.View.extend({
            tagName: 'div',
            className: 'ux-scripting',
            events: {
                'click .ux-script-output>div.panel-heading>button': function () {
                    var me = this;
                    var pre = $(me.$el.find('.ux-script-output>div.panel-body>pre').get(0));
                    pre.empty();
                },
                'click .ux-execute-script': function (evt) {
                    // TRICK to avoid full page reload.
                    evt.preventDefault();
                    var me = this;
                    me.trigger('execute-action', {
                        engine: me.editor.getOption("mode"),
                        script: me.editor.getValue()
                    });
                    me.$el.find('.ux-execute-script').addClass('disabled');
                },
                'click .ux-source-option': function (evt) {
                    // TRICK to avoid full page reload.
                    evt.preventDefault();
                    var me = this;
                    var myLink = $(evt.target);
                    me.trigger('type-chosen', {
                        name: myLink.attr('name')
                    });
                }
            },

            showSourceType: function (name) {
                var me = this;
                //saving old code
                if (this.options.isRendered) {
                    codes[me.editor.getOption("mode")] = me.editor.getValue();
                }
                me.editor.setOption("mode", name);
                // swapping sources
                me.editor.setValue(codes[name]); // setting new code
                me.$el.find('.ux-source-choice').html(i18n.get(name));

            },

            fitCodeField: function () {
                var me = this;
                var panelBody = $(me.$el.find('.ux-script-source').get(0));
                me.editor.setSize(panelBody.width() - 22, panelBody.height() - 120);
            },

            renderCallback: function () {
                var me = this;
                me.fitCodeField();
            },

            appendOutput: function (output) {
                var me = this;
                var pre = $(me.$el.find('.ux-script-output>div.panel-body>pre').get(0));
                pre.append(output);
                me.$el.find('.ux-execute-script').removeClass('disabled');
                var contentArea = $(me.$el.find('.panel-body').get(0));
                contentArea.animate({
                    scrollTop: contentArea.prop("scrollHeight")
                }, 250);
            },

            render: function () {
                var me = this;
                if (!this.options.isRendered) {
                    me.$el.empty();
                    me.$el.append(templates.getValue('scripting', {}));
                    me.editor = codeMirror.fromTextArea(me.$el.find('textarea').get(0), {
                        extraKeys: {"Ctrl-Space": "autocomplete"}
                    });
                    me.editor.setValue('');
                    me.showSourceType('javascript');
                    this.options.isRendered = true;
                    $(window).resize(function () {
                        me.fitCodeField();
                    });
                }
                me.editor.focus();
                return this;
            }
        });
        return new View();
    });
}());

