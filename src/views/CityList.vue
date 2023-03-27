<template>
    <div class="citylist">
      <h4>City List</h4>
      <br>
      <div class="row">
      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"/>
      <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
      <div class="panel panel-info" >
        <div class="panel-heading">
          <h3 class="panel-title">List of Cities</h3>
        </div>
        <div class="panel-body">
          <div class="row">
        <div class="col-sm-6 col-md-4" v-for="(city, key) in cities" :key ='key' >
          <div class="thumbnail">
            <img :src="`./src/assets/${city.image}`" style="width:80%">
            <div class="caption">
              <p><b>{{city.name}}</b></p>
              <p class="citydetail">"{{ city.detail }}</p>
                <router-link :to = "{path: 'info', name: 'Info', params: {city: city.name}}">
                    <button class="btn btn-success" role="button" >Detail</button>

                </router-link>

            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
      </div>
      <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"/>
      </div>
      <div class="row">
      <div class="container">
        <button class="btn btn-warning" @click="logout"><span class="glyphicon glyphicon-log-out"></span> Logout</button>
      </div>
      </div>
      <br>
    </div>
</template>
  
<script>
import {collection, onSnapshot, getFirestore} from 'firebase/firestore'
import {getAuth, signOut} from 'firebase/auth'
import { assert } from '@vue/compiler-core'
  export default {
    name: 'CityList',
    data () {
      return {
        msg: 'EGCI427 Practice',
        city: null,
        cities: {},
        cityIds:{},
        editName: [],
        auth: getAuth()
      }
    },
    mounted () {
      console.log('City List')
      const db = getFirestore()
      const colRef = collection(db, "cities")
      onSnapshot(colRef, snapShot => {
        this.cities = snapShot.docs.map(doc => doc.data())
        this.cityIds = snapShot.docs.map(doc => doc.id)
      })
    },
    methods: {
      logout () {
        console.log('logout')
        signOut(this.auth)
      .then(()=>{
        this.$router.replace('/signin')
      })
      .catch((error) => {
        alert(error.message)
      })
      }
    }
  }
  </script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  /* display: inline-block; */
  margin: 0 10px;
}
a {
  color: #ffffff;
}
p.citydetail{
  text-align: justify;
}


</style>
