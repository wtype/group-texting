import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    members: [],
    membersToText: [],
    message: "",
    name: "",
    phone: ""
  },
  mutations: {
    updateMembers(state, members) {
      state.members = members;
    },
    setMessage(state, message) {
      state.message = message;
    },
    setName(state, name) {
      state.name = name;
    },
    setPhone(state, phone) {
      state.phone = phone;
    },
    addMember(state, member) {
      if (state.membersToText.includes(member)) {
        return;
      }
      member.addedToText = true;
      state.membersToText.push(member);
    },
    addAllMembers(state) {
      state.members.forEach(member => {
        if (state.membersToText.includes(member)) {
          return;
        }
        member.addedToText = true;
        state.membersToText.push(member);
      });
    },
    removeMember(state, member) {
      member.addedToText = false;
      const index = state.membersToText.indexOf(member);
      state.membersToText.splice(index, 1);
    },
    removeAllMembers(state) {
      state.membersToText.forEach(member => (member.addedToText = false));
      state.membersToText.splice(0, state.membersToText.length);
    }
  },
  actions: {
    loadMembers(context) {
      const url = "http://localhost:9090/directory";
      fetch(url)
        .then(response => response.json())
        .then(members => {
          context.commit("updateMembers", members);
        });
    },
    sendMessage(context) {
      const url = "http://localhost:9090/send";

      const payload = {
        message: context.state.message,
        members: context.state.membersToText
      };

      fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "content-type": "application/json"
        }
      })
        .then(() => {})
        .catch(err => console.log(err));

      context.state.membersToText.forEach(member => (member.addedToText = false));
      context.state.membersToText.splice(0, context.state.membersToText.length);
    },
    removeMember(context, { member, index }) {
      const id = member._id;
      context.state.members.splice(index, 1);

      const url = `http://localhost:9090/delete/?id=${id}`;
      fetch(url, {
        method: "DELETE"
      })
        .then(() => {})
        .catch(err => console.log(err));
    },
    isNumber(context) {
      const regex = /[0-9]/g;
      const found = context.state.phone.toString().match(regex);

      if (found === null) {
        return false;
      }
      if (found.length === context.state.phone.length) {
        return true;
      }
    },
    addMemberToDirectory(context) {
      const url = "http://localhost:9090/directory";

      if (!context.dispatch("isNumber")) {
        alert("Please enter a valid number: no characters, parantheses, or dashes");
        return;
      }

      const info = {
        name: context.state.name,
        phone: context.state.phone
      };

      fetch(url, {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
          "content-type": "application/json"
        }
      })
        .then(response => response.json())
        .then(member => {
          context.state.members.push(member);
          context.state.name = "";
          context.state.phone = "";
        })
        .catch(err => console.log(err));

      document.querySelector("form").reset();
    }
  }
});
