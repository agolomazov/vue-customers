<template>
  <div class="add-customers container">
    <h1 class="page-header">Add customer</h1>
    <form v-on:submit.prevent="addCustomer">

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

      <button type="submit" class="btn btn-primary">Добавить клиента</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'add-customer',
    data () {
      return {
        customer: {
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          state:''
        }
      }
    },
    methods: {
      addCustomer () {
        if(!this.customer.first_name || !this.customer.last_name || !this.customer.email){
          console.log('Fill all fields')
          return false
        } else {
          let newCustomer = {
            first_name: this.customer.first_name,
            last_name: this.customer.last_name,
            phone: this.customer.phone,
            email: this.customer.email,
            address: this.customer.address,
            city: this.customer.city,
            state: this.customer.state
          }

          this.$http.post('http://customers.rest/api/customer/add', newCustomer)
            .then(function(response){
              this.$router.push({path: '/', query: { alert: 'Customer Added' }})
            })
        }
      },
    }
  }
</script>

<style scoped>

</style>
