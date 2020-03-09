<template>
  <div id="app">
    <Members :members="members" @addMember="addMember" />
    <Texting :membersToText="membersToText" @removeMember="removeMember" @removeAll="removeAll" />
    <Message :membersToText="membersToText" @sendMessage="sendMessage" />
  </div>
</template>

<script>
import Members from "./Members";
import Texting from "./Texting";
import Message from "./Message";
import { members } from "../allMembers";

export default {
  name: "App",
  data() {
    return {
      members,
      membersToText: []
    };
  },
  components: {
    Members,
    Texting,
    Message
  },
  methods: {
    addMember(member) {
      if (this.membersToText.includes(member)) {
        return;
      }
      this.membersToText.push(member);
    },
    removeMember(member) {
      const index = this.membersToText.indexOf(member);
      this.membersToText.splice(index, 1);
    },
    addAll() {
      this.members.forEach(member => {
        this.membersToText.push(member);
      });
    },
    removeAll() {
      this.membersToText.forEach(member => {
        member.addedToText = false;
      });
      this.membersToText.splice(0, this.membersToText.length);
    },
    sendMessage(message) {
      const url = "http://localhost:9090/send";

      const payload = {
        message,
        members: this.membersToText
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

      this.membersToText.forEach(member => (member.addedToText = false));
      this.membersToText = [];
    }
  }
};
</script>

<style>
</style>
