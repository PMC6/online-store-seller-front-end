<template>
<!-- 登录 -->
<div class="log">
    <div id="login">
    <Form ref="formInline" :model="formInline" :rules="ruleInline"  >
        <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="Username" autofocus clearable="">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
           </Input>
        </FormItem>
        <FormItem prop="password" >
            <Input type="password" v-model="formInline.password" placeholder="Password" @on-enter="handleSubmit('formInline')" clearablec>
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
import Bus from "./bus.js"

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
      mounted(){
        storage.set("logStatus", false);
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
                            storage.set('telephone', response.data.data.principal.telephone);
                            storage.set('email', response.data.data.principal.email);
                            if(response.data.data.principal.roles.length === 2){
                                storage.set("role", "seller");
                                this.$router.push({path:"/shopInfo"});
                            }else {
                                this.$router.push({path:"/sellermain"});
                                storage.set("role", "customer");
                            }
                            storage.set("logStatus", true);
                          Bus.$emit("login", "success");
                        }).catch(err=>{
                          this.$Message.error("Account password mismatch");
                            console.log(err.response);
                        })

                    } else {
                        this.$Message.error('Fail!');
                        // this.$router.push({path:"/"});
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
    background-image:url(../assets/bgi.png);
    background-size: cover;
}
#login{
     width:30%;
     height:50%;
     margin:5% auto;
     background-color: rgba(255, 255, 255, 0.7);
}
 Form{
     /* margin:50px auto;*/
     position: relative;
     top:20%;
     margin:0 auto;
     width:50%;
 }
 Button{
     margin-left:35%;
 }
</style>

