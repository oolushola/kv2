<template>
    <div>
        <div class="container">
            <form>
                <div class="LogoHolder">
                    <img src="../../assets/images/logo.png" alt="companys_logo">
                </div>

                <h4>Login</h4>
                <p>Enter your login credentials here</p>
            
                <div class="form-section">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="text" class="form-control" v-model="email" placeholder="johndoe@example.com" autocomplete="true">
                    </div>
                    <div class="form-group">
                        <label for="email">Password</label>
                        <input type="password" class="form-control" v-model="password" placeholder="Password" autocomplete="true" suggested>
                    </div>
                    <button class="btn btn-primary" @click.prevent="signUp">Login</button>
                </div>

                <p>Forgot your password?</p>
                <p><router-link to="/sign-up">Don't have an account? Sign up here</router-link></p>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        signUp() {
            const authData = {
                email: this.email,
                password: this.password
            }
            this.$store.dispatch('login', authData);
        }
    }
}
</script>

<style>
    body {
        background: url('../../assets/images/default-background.jpg');
        background-size: 100% 50% cover;
        background-repeat: no-repeat;
        font-family: DIN Alternate;
    }
    .container {
        margin:auto;
        background:rgba(225, 225, 225, 0.6);
        height: 500px;
        position: relative;
        top:17vh;
        width:350px;
        border-radius:5px;
        align-content: center;
        text-align: center;
    }
    .LogoHolder {
        border-radius:100%;
        height:100px;
        width:100px;
        margin:auto;
        position: relative;
        padding:15px;
        top:20px;
        bottom:30px;
    }
    .LogoHolder img {
        width: inherit;
        height: inherit;
    }
    .form-section {
        width:210px;
        margin:auto;
        height: inherit;
        overflow: hidden;
        text-align: justify;
        padding:10px;
    }
    .form-group {
      display: block;  
    }
    .form-group label {
        display: block;
        font-size: 13px;
        padding:5px
    }
    .form-group input, select, checkbox, radio {
        outline: none;
    }
    input {
        border-radius:5px;
        border:1px solid #ccc;
        padding: 10px;
        width: 180px;
        margin-bottom: 10px;
    }
    h4 {
        margin-top:30px;
    }
    p {
        font-size:13px;
    }
    .btn {
        border-radius:5px;
        font-family: DIN alternate;
        padding: 10px;
        font-size: 13px;
        cursor: pointer;
        border:none
    }
    .btn:hover {
        background:lightskyblue;
        color: #fff;
        border:none
    }

</style>