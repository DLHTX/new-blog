<template>
    <div class='my_box'>

        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item >
                <div style="display: flex;align-items: center;">
                    <img :src="user.headImg" alt="" style="height:4rem;cursor:pointer;border-radius: 50%;" v-if='!sendedImg'>
                    <img :src="sendedImg" alt="" style="height:4rem;cursor:pointer;border-radius: 50%;" v-if='sendedImg'>
                    <el-upload
                    class="upload-demo"
                    action=""
                    :show-file-list="false"
                    :http-request="uploadFile"
                    >
                        <el-button  class='changeHead' size="small" type="primary">更改头像</el-button>
                    </el-upload>
                </div>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.resource" label="left" style="">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                    <el-radio label="外星人"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="爱好">
                <el-checkbox-group v-model="form.type" label="left">
                    <el-checkbox label="男" name="type"></el-checkbox>
                    <el-checkbox label="女" name="type"></el-checkbox>
                    <el-checkbox label="男女" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="个人简介">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>
    import { mapGetters, mapActions } from "vuex";
    import blog from '../../api/blog';

    export default {
        data() {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
            },
            fileList:[],
            sendedImg:''
        }
        },
        methods: {
            ...mapActions(["getGrxx", "checkLogin", "logout", "getPermissions",]),
            onSubmit() {
                console.log('submit!');
            },
            $imgAdd(pos, $file){
                //上传图片接口
                blog.upImg($file.miniurl).then(res=>{
                    if(res.success){
                        this.$message({message: '图片上传成功',type: 'success'})
                        this.$refs.md.$img2Url(pos, res.data);
                    }else{
                        this.$message.error({message: '上传图片失败'})
                    }
                })
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            uploadFile(options) {
                let file = options.file
                let filename = file.name
                let reader = new FileReader();
                if (file) {
                    reader.readAsDataURL(file)
                }
                reader.onload = () => {
                    let base64Str = reader.result
                    blog.upImg(base64Str).then(res=>{
                        if(res.success){
                            //this.$message({message: '图片上传成功',type: 'success'})
                            this.checkUser(res.data)
                            //this.sendedImg = res.data 图片回显
                        }else{
                            this.$message.error({message: '上传图片失败'})
                        }
                        
                    })
                }
            },
            checkUser(url){
                this.$prompt('请输入密码', '身份认证', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    this.changeHeadImg(url,this.$md5(value))
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消更改'
                    });       
                });
            },
            async changeHeadImg(headImg,password){
                console.log('aaa')
                try{
                    let res = await blog.changeHeadImg(headImg,this.user.name,password)
                    this.sendedImg = headImg //图片回显
                    this.$message({
                        type: 'success',
                        message: '头像更改成功!请重新登录'
                    });
                    setTimeout(res=>{
                        this.logout()
                            setTimeout(res=>{
                                this.$router.push({path:'/login'})
                            },1000)
                    },2000)
                    console.log(res)
                }catch(err){
                    this.$message.error({
                        message: '头像更改失败!请检查密码'
                    });
                }
            }
        },
        computed: {
            ...mapGetters(["isLogin", "user"])
        },
    }
</script>

<style lang="less">
.my_box{
    width: 40%;
    margin: 2rem auto;
    background: white;
    padding: 2rem;
}
.el-form-item{
    text-align: left!important;
}
.el-radio__input.is-checked .el-radio__inner {
    border-color: #fb7377!important;
    background: #fb7377!important;
}
.el-radio__input.is-checked+.el-radio__label{
    color: #fb7377;
}
.el-checkbox__input.is-checked+.el-checkbox__label{
    color: #fb7377;
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #fb7377;
    border-color: #fb7377;
}
.el-button--primary {
    color: #FFF;
    background-color: #fb7377;
    border-color: #fb7377;
}
.el-button--primary:focus, .el-button--primary:hover {
    background: #fa5a5f;
    border-color: #fc5257;
    color: #FFF;
}
.el-input.is-active .el-input__inner, .el-input__inner:focus {
    border-color: #fb7377;
    outline: 0;
}
.el-textarea__inner:focus {
    outline: 0;
    border-color: #fb7377;
}
.el-checkbox__inner:hover {
    border-color: #fb7377;
}
.el-radio__inner:hover {
    border-color: #fb7377;
}
.changeHead{
    margin-left: 1rem;
    color: white;
    display: flex;
    padding: 0 1rem;
    align-items: center;
    border-radius: 22px;
    height: 2rem;
    background: #7e6fe1;
    border: #7e6fe1;
    transition: all .3s;
    cursor:pointer;
    &:hover{
        background: #7563e6;
        transition: all .3s;
    }
}
</style>
