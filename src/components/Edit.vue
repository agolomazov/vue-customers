<template>
  <div class="add-customers container">
    <router-link to="/" class="btn btn-default btn-sm">Back</router-link>
    <h1 class="page-header">Edit customer</h1>
    <alert v-if="alert" :message="alert"></alert>
    <form v-on:submit.prevent="editCustomer(customer.id)">
      <div class="well">
        <h4>Customer Info</h4>
        <div class="form-group">
          <label for="firstNameInput">First Name</label>
            <input v-model="customer.first_name" type="text" class="form-control" placeholder="First Name" id="firstNameInput">
        </div>
        <div class="form-group">
          <label for="lastNameInput">Last Name</label>
          <input v-model="customer.last_name" type="text" class="form-control" placeholder="First Name" id="lastNameInput">
        </div>
      </div>

      <div class="well">
        <h4>Customer Contact</h4>
        <div class="form-group">
          <label for="emailInput">Email</label>
          <input v-model="customer.email" type="email" class="form-control" placeholder="admin@admin.ru" id="emailInput">
        </div>
        <div class="form-group">
          <label for="phoneInput">Phone</label>
          <input v-model="customer.phone" type="tel" class="form-control" placeholder="+7(980)999-99-99" id="phoneInput">
        </div>
      </div>

      <div class="well">
        <h4>Customer Location</h4>
        <div class="form-group">
          <label for="addressInput">Address</label>
          <input v-model="customer.address" type="text" class="form-control" placeholder="3-я улица Сторителей, 25, кв. 12" id="addressInput">
        </div>

        <div class="form-group">
          <label for="cityInput">City</label>
          <input v-model="customer.city" type="text" class="form-control" placeholder="Москва" id="cityInput">
        </div>

        <div class="form-group">
          <label for="stateInput">State</label>
          <input v-model="customer.state" type="text" class="form-control" placeholder="Москва" id="stateInput">
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Редактировать</button>
    </form>
  </div>
</template>

<script>
  import Alert from './Alert.vue'

  export default {
    name: 'edit-customer',
    data () {
      return {
        customer: {
          id: null,
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          state:''
        },
        alert: ''
      }
    },
    components: {
      Alert
    },
    methods: {
      fetchCustomer(){
        var id = this.$route.params.id
        this.$http.get('http://customers.rest/api/customer/' + id).then(
          function (response) {
            this.customer = JSON.parse(response.body)
          }
        )
      },
      editCustomer (id) {
        if(!this.customer.first_name || !this.customer.last_name || !this.customer.email){
          this.alert = 'Пожалуйста, заполните все обязательные поля'
          setInterval(() => {
            this.alert = ''
          }, 2000)
        } else {
          let updatedUser = {
            first_name: this.customer.first_name,
            last_name: this.customer.last_name,
            phone: this.customer.phone,
            email: this.customer.email,
            address: this.customer.address,
            city: this.customer.city,
            state: this.customer.state
          }

          this.$http.put('http://customers.rest/api/customer/update/' + id, updatedUser)
            .then(function(response){
              this.$router.push({path: '/', query: { alert: 'Customer updated' }})
            })
        }
      },
    },
    created(){
      this.fetchCustomer()
    }
  }
</script>

<style scoped>

</style>
