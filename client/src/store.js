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
    deleteMember(state, { member, index }) {
      state.members.splice(index, 1);

      if (state.membersToText.includes(member)) {
        member.addedToText = false;
        const idx = state.membersToText.indexOf(member);
        state.membersToText.splice(idx, 1);
      }
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
      }).catch(err => console.log(err));

      context.state.membersToText.forEach(member => (member.addedToText = false));
      context.state.membersToText.splice(0, context.state.membersToText.length);
    },
    deleteMember({ commit }, { member, index }) {
      let id = member._id;
      const url = `http://localhost:9090/delete/?id=${id}`;

      fetch(url, {
        method: "DELETE"
      })
        .then(() => {
          commit('deleteMember', { member, index });
        })
        .catch(err => console.log(err));
    },
    addMemberToDirectory(context) {
      const url = "http://localhost:9090/directory";

      const regex = /[0-9]/g;
      const found = context.state.phone.toString().match(regex);
      let alreadyAdded = false;

      if (context.state.members.find(member => member.phone === `+1${context.state.phone}`)) {
        alreadyAdded = true;
        alert('This phone number already exists.');
        return;
      }

      if (found.length === context.state.phone.length && !alreadyAdded) {
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
            context.dispatch('loadMembers');
          })
          .catch(err => console.log(err));

        document.querySelector("form").reset();
      }
      else {
        alert('Please enter a valid number: no characters, parenthesis, or dashes');
      }
    }
  }
});
