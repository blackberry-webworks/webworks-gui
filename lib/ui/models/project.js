var Project,
    server = require("../server"),
    storage = require("../storage");

Project = Backbone.Model.extend({
    sync: function (method, model, options) {
        var projects = storage.readProjects(),
            id = this.get("location");

        switch (method) {
        case "update":
            projects[id] = this.toJSON();
            break;
        case "create":
            projects[id] = this.toJSON();
            break;
        case "delete":
            delete projects[id];
            break;
        }

        storage.saveProjects(projects);
    },
    getConfigXml: function (callback) {
        server.getProjectConfig({
            path: this.get("location")
        }, function (response) {
            var xmldoc = $.parseXML(response.configFile);
            callback($(xmldoc));
        }, callback);
    },
    setConfigXml: function (xmldoc, callback) {
        server.setProjectConfig({
            path: this.get("location"),
        }, callback, callback);
    }
});

module.exports = Project;
// Sample usage:
// var p = new Project({
//        name: "Project Name",
//        location: "/path/to/place"
//      });