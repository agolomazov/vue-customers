<template>
  <div class="details container">
    <router-link to="/" class="btn btn-default btn-sm">Back</router-link>
    <alert v-if="alert" v-bind:message="alert"></alert>
    <h1 class="page-header">{{ fullName }}
      <span class="pull-right">
        <button @click="deleteCustomer(customer.id)" class="btn btn-default btn-sm btn-danger">Delete</button>
      </span>
    </h1>
    <ul class="list-group">
      <li v-if="customer.phone" class="list-group-item"><i class="glyphicon glyphicon-phone"></i> <a v-bind:href="phone">{{ customer.phone }}</a></li>
      <li v-if="customer.email" class="list-group-item"><i class="glyphicon glyphicon-envelope"></i> <a v-bind:href="email">{{ customer.email }}</a></li>
    </ul>

    <ul class="list-group">
      <li v-if="customer.address" class="list-group-item"><i class="glyphicon glyphicon-home"></i> {{ customer.address }}</li>
      <li v-if="customer.city" class="list-group-item"><i class="glyphicon glyphicon-road"></i> {{ customer.city }}</li>
      <li v-if="customer.state" class="list-group-item"><i class="glyphicon glyphicon-zoom-out"></i> {{ customer.state }}</li>
    </ul>
  </div>
</template>
<script>
  import Alert from './Alert.vue'
  import Format from '../utils/Format'

  let formatUtil = new Format()

  export default {
    name: 'details',
    data () {
      return {
        customer: {},
        alert: ''
      }
    },
    components: { Alert },
    computed: {
      fullName(){
        return `${this.customer.first_name} ${this.customer.last_name}`
      },
      email(){
        return formatUtil.formatMailLink(this.customer.email)
      },
      phone(){
        return formatUtil.formatPhoneLink(this.customer.phone)
      }
    },
    methods: {
      fetchCustomer(id) {
        this.$http.get('http://customers.rest/api/customer/' + id)
          .then(function(response){
            this.customer = JSON.parse(response.body)
          })
      },
      deleteCustomer(id){
        this.$http.delete('http://customers.rest/api/customer/delete/' + id).
          then(function(response){
            this.alert = ''
          this.$router.push({
              path: '/',
              query: {
                alert: 'Customer deleted'
              }
            })
        }, function (error) {
            this.alert = error.statusText

            setTimeout(() => {
              this.alert = ''
            }, 3000)
        })
      }
    },
    created () {
      this.fetchCustomer(this.$route.params.id)
    }
  }
</script>

<style scoped>

</style>
