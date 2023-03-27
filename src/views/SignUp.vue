<template>
    <div class="row">
        <h2>SignUp</h2>
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-md-offset-3"/>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-md-offset-3">

            <input type="email" class="form-control" placeholder="email" v-model="formData.email">
            <br>
            <input type="password" class="form-control" placeholder="password" v-model="formData.password">
            <br>
            <button class="btn btn-success" @click="signUp">SignUp</button>
        </div>
    </div>
</template>
<script>
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'

export default {
  name: 'SignUp',
  data () {
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signUp () {
        const auth = getAuth()
            createUserWithEmailAndPassword(
                auth,
                this.formData.email,
                this.formData.password
            )
            .then((userCredential)=>{
                console.log("Successfully registered!")
                this.$router.replace('/cities')
            })
            .catch((error) => {
                console.log(error.code)
                alert(error.message)
            })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
