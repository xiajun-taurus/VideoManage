<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-col :span="12" style="margin-top: 20px;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
            <el-form-item label="歌手" prop="author">
                <el-input v-model="ruleForm.author"></el-input>
            </el-form-item>
            <el-form-item label="歌曲" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item  prop="path">
                <el-input type="hidden" v-model="ruleForm.path"></el-input>
            </el-form-item>
            <el-form-item label="请上传背景音乐">
                <el-upload
                    class="upload-demo"
                    drag
                    :on-success="handleSuccess"
                    :before-upload="beforeUpload"
                    action="http://localhost:8085/bgm/bgmUpload"
                    name="file"
                    >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传acc/mp3/m4a/wav文件</div>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即上传</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
        </el-col>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    import {addBgm} from "../api/getData";
    export default {
	    data(){
	        return{
                ruleForm: {
                    author: '',
                    name: '',
                    path: ''
                },
                rules: {
                    author: [
                        { required: true, message: '请输入歌手名称', trigger: 'blur' },
                        { min: 1, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入歌曲名称', trigger: 'blur' }
                    ],
                    path: [
                        { required: true, message: '请上传背景音乐', trigger: 'blur' }
                    ]
                }
            }
        },
    	components: {
    		headTop,
    	},
        methods:{
            handleSuccess(res, file) {
                this.ruleForm.path = res.data
                console.log(res.data)
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        console.log(this.ruleForm)
                        let result = await addBgm(this.ruleForm)
                        if (result.status === 200){
                            this.$message({
                                type: 'success',
                                message: '上传成功'
                            });
                            this.$router.push('/bgmList')
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            beforeUpload(file) {
                var FileExt = file.name.replace(/.+\./, "");
                if (['acc','m4a','mp3','wav'].indexOf(FileExt.toLowerCase()) === -1){
                    this.$message({
                        type: 'warning',
                        message: '只能上传acc/mp3/m4a/wav文件'
                    });
                    return false;
                }
            }
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.explain_text{
		margin-top: 20px;
		text-align: center;
		font-size: 20px;
		color: #333;
	}
</style>
