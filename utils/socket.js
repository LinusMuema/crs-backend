const { Server } = require('socket.io');
const singleton = (() => {
    this.configure = (server) => this.io = new Server(server)
    return this
})();

module.exports = singleton