<template>
<div class="log">
    <div id="login">
    <Form ref="formInline" :model="formInline" :rules="ruleInline"  >
        <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="Username" >
                <Icon type="ios-person-outline" slot="prepend"></Icon>
           </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
        </FormItem>
    </Form>
</div>
</div>


</template>
<script>
import axios from 'axios'
import storage from '../model/storage.js'

    export default {
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 5, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        axios.post('/user/login', {
                            'username':this.formInline.user,
                            'password':this.formInline.password
                        }).then(response=>{
                            console.log(response.data);
                            this.$Message.success('Success!');
                            this.$parent.loginshow=false;
                            this.$parent.navshow=true;
                            this.$parent.username=this.formInline.user;
                            storage.set('userinfors',response);
                            storage.set('userName', this.formInline.user);
                            // alert(JSON.stringify(response));
                            storage.set('telephone', response.data.data.principal.telephone);
                            storage.set('email', response.data.data.principal.email);
                            if(response.data.data.principal.roles.length == 2){
                                this.$router.push({path:"/shopInfo"});
                            }else this.$router.push({path:"/"});

                        }).catch(err=>{
                          alert("Account password mismatch");
                            console.log(err.response);
                        })

                    } else {
                        this.$Message.error('Fail!');
                        this.$router.push({path:"/"});
                    }
                })
            }
        }
    }
</script>
<style scoped>
.log{
    margin:0;
    padding:0;
    width:100%;
    height:600px;
    background-color: red;
}
#login{
     width:40%;
     height:50%;
     margin:5% auto;
     background-color: rgba(124, 192, 223, 0.5);
}
 Form{
     margin:20% auto;
     width:50%;
 }
 Button{
     margin-left:35%;
 }
</style>

