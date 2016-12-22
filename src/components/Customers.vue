<template>
  <div class="customers container">
    <h1 class="page-header">Manage customers</h1>
    <alert v-if="alert" v-bind:message="alert"></alert>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="customer in customers">
        <td>{{ customer.first_name }}</td>
        <td>{{ customer.last_name }}</td>
        <td><a v-bind:href=getMailToLink(customer.email) target="_blank">{{ customer.email }}</a></td>
        <td>
          <router-link v-bind:to="getDetailsLink(customer.id)" class="bnt btn-default btn-sm btn-primary">View</router-link>
          <router-link v-bind:to="getEditLink(customer.id)" class="bnt btn-default btn-sm btn-success">Edit</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Alert from './Alert.vue'

  export default {
    name: 'customers',
    components: { Alert },
    data () {
      return {
        customers: [],
        alert: ''
      }
    },
    methods: {
      fetchCustomers() {
        this.$http.get('http://customers.rest/api/customers').then(function (response) {
          this.customers = JSON.parse(response.body)
        })
      },
      getMailToLink (link){
        return 'mailto:' + link
      },
      getDetailsLink (id) {
        return '/customer/' + id
      },
      getEditLink(id){
        return '/customer/edit/' + id
      },
      showAlert(){
        if(this.$route.query.alert){
          this.alert = this.$route.query.alert
          setTimeout(() => {
            this.alert = ''
          }, 3000)
        }
      }
    },
    created () {
      this.showAlert()
      this.fetchCustomers()
    },
    updated () {

    }
  }
</script>

<style scoped>

</style>
