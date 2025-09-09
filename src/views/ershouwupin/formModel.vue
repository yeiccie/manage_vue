<template>
	<div>
		<el-dialog modal-class="edit_form_modal" class="edit_form" v-model="formVisible" :title="formTitle" width="50%" destroy-on-close :fullscreen='false'>
			<el-form class="formModel_form" ref="formRef" :model="form" :rules="rules">
				<el-row >
					<el-col :span="24">
						<el-form-item label="商品名称" prop="shangpinmingcheng">
							<el-input class="list_inp" v-model="form.shangpinmingcheng" placeholder="商品名称"
                                type="text"
								:readonly="!isAdd||disabledForm.shangpinmingcheng?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item prop="waiguan"
									  label="外观"
						>
							<uploads
								:disabled="!isAdd||disabledForm.waiguan?true:false"
								action="file/upload"
								tip="请上传外观"
								style="width: 100%;text-align: left;"
								:fileUrls="form.waiguan?form.waiguan:''"
								@change="waiguanUploadSuccess">
							</uploads>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="商品分类" prop="shangpinfenlei">
							<el-select
								class="list_sel"
								:disabled="!isAdd||disabledForm.shangpinfenlei?true:false"
								v-model="form.shangpinfenlei"
								placeholder="请选择商品分类"
								>
								<el-option v-for="(item,index) in shangpinfenleiLists" :label="item"
									:value="item"
									>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="品牌" prop="pinpai">
							<el-input class="list_inp" v-model="form.pinpai" placeholder="品牌"
                                type="text"
								:readonly="!isAdd||disabledForm.pinpai?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="新旧程度" prop="xinjiuchengdu">
							<el-input class="list_inp" v-model="form.xinjiuchengdu" placeholder="新旧程度"
                                type="text"
								:readonly="!isAdd||disabledForm.xinjiuchengdu?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="原产厂家" prop="yuanchanchangjia">
							<el-input class="list_inp" v-model="form.yuanchanchangjia" placeholder="原产厂家"
                                type="text"
								:readonly="!isAdd||disabledForm.yuanchanchangjia?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="用途" prop="yongtu">
							<el-input class="list_inp" v-model="form.yongtu" placeholder="用途"
                                type="text"
								:readonly="!isAdd||disabledForm.yongtu?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="具体材质" prop="juticaizhi">
							<el-input class="list_inp" v-model="form.juticaizhi" placeholder="具体材质"
                                type="text"
								:readonly="!isAdd||disabledForm.juticaizhi?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="价格" prop="price">
							<el-input class="list_inp" v-model.number="form.price" placeholder="价格"
                                type="number"
								:readonly="!isAdd||disabledForm.price?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="单限" prop="onelimittimes">
							<el-input class="list_inp" v-model.number="form.onelimittimes" placeholder="单限"
                                type="text"
								:readonly="!isAdd||disabledForm.onelimittimes?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="库存" prop="alllimittimes">
							<el-input class="list_inp" v-model.number="form.alllimittimes" placeholder="库存"
                                type="text"
								:readonly="!isAdd||disabledForm.alllimittimes?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="卖家账号" prop="maijiazhanghao">
							<el-input class="list_inp" v-model="form.maijiazhanghao" placeholder="卖家账号"
                                type="text"
								:readonly="!isAdd||disabledForm.maijiazhanghao?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="卖家姓名" prop="maijiaxingming">
							<el-input class="list_inp" v-model="form.maijiaxingming" placeholder="卖家姓名"
                                type="text"
								:readonly="!isAdd||disabledForm.maijiaxingming?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="产品描述" prop="chanpinmiaoshu">
							<editor :value="form.chanpinmiaoshu" placeholder="请输入产品描述" :readonly="!isAdd||disabledForm.chanpinmiaoshu?true:false"
								class="list_editor" @change="(e)=>editorChange(e,'chanpinmiaoshu')"></editor>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer v-if="isAdd||type=='logistics'||type=='reply'">
				<span class="formModel_btn_box">
					<el-button class="cancel_btn" @click="closeClick">取消</el-button>
					<el-button class="confirm_btn" type="primary" @click="save"
						>
						提交
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script setup>
	import {
		reactive,
		ref,
		getCurrentInstance,
		nextTick,
		computed,
		defineEmits
	} from 'vue'
    import {
        useStore
    } from 'vuex';
    const store = useStore()
    const user = computed(()=>store.getters['user/session'])
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	const emit = defineEmits(['formModelChange'])
	//基础信息
	const tableName = 'ershouwupin'
	const formName = '二手物品'
	//基础信息
	//form表单
	const form = ref({})
	const disabledForm = ref({
        shangpinmingcheng : false,
        waiguan : false,
        shangpinfenlei : false,
        pinpai : false,
        xinjiuchengdu : false,
        yuanchanchangjia : false,
        yongtu : false,
        juticaizhi : false,
        chanpinmiaoshu : false,
        price : false,
        onelimittimes : false,
        alllimittimes : false,
        maijiazhanghao : false,
        maijiaxingming : false,
        sfsh : false,
        shhf : false,
        discussNumber : false,
        storeupNumber : false,
	})
	const formVisible = ref(false)
	const isAdd = ref(false)
	const formTitle = ref('')

	const rules = ref({
		shangpinmingcheng: [
			{required: true,message: '请输入',trigger: 'blur'},
		],
		waiguan: [
		],
		shangpinfenlei: [
			{required: true,message: '请输入',trigger: 'blur'},
		],
		pinpai: [
		],
		xinjiuchengdu: [
		],
		yuanchanchangjia: [
		],
		yongtu: [
		],
		juticaizhi: [
		],
		chanpinmiaoshu: [
		],
		price: [
			{ validator: context.$toolUtil.validator.number, trigger: 'blur' },
		],
		onelimittimes: [
			{ validator: context.$toolUtil.validator.intNumber, trigger: 'blur' },
		],
		alllimittimes: [
			{ validator: context.$toolUtil.validator.intNumber, trigger: 'blur' },
		],
		maijiazhanghao: [
		],
		maijiaxingming: [
		],
		sfsh: [
		],
		shhf: [
		],
		discussNumber: [
			{ validator: context.$toolUtil.validator.intNumber, trigger: 'blur' },
		],
		storeupNumber: [
			{ validator: context.$toolUtil.validator.intNumber, trigger: 'blur' },
		],
	})
	//表单验证

	const formRef = ref(null)
	const id = ref(0)
	const type = ref('')
	//外观上传回调
	const waiguanUploadSuccess=(e)=>{
		form.value.waiguan = e
	}
	//商品分类列表
	const shangpinfenleiLists = ref([])

	//获取唯一标识
	const getUUID =()=> {
      return new Date().getTime();
    }
	//重置
	const resetForm = () => {
		form.value = {
			shangpinmingcheng: '',
			waiguan: '',
			shangpinfenlei: '',
			pinpai: '',
			xinjiuchengdu: '',
			yuanchanchangjia: '',
			yongtu: '',
			juticaizhi: '',
			chanpinmiaoshu: '',
			price: '0',
			onelimittimes: '-1',
			alllimittimes: '-1',
			maijiazhanghao: '',
			maijiaxingming: '',
			sfsh: '待审核',
			shhf: '',
		}
	}
	//获取info
	const getInfo = ()=>{
		context?.$http({
			url: `${tableName}/info/${id.value}`,
			method: 'get'
		}).then(res => {
			let reg=new RegExp('../../../file','g')
			res.data.data.chanpinmiaoshu = res.data.data.chanpinmiaoshu?(res.data.data.chanpinmiaoshu.replace(reg,'../../../project/file')):'';
			form.value = res.data.data
			formVisible.value = true
		})
	}
	const crossRow = ref('')
	const crossTable = ref('')
	const crossTips = ref('')
	const crossColumnName = ref('')
	const crossColumnValue = ref('')
	//初始化
	const init=(formId=null,formType='add',formNames='',row=null,table=null,statusColumnName=null,tips=null,statusColumnValue=null)=>{
		resetForm()
		if(formId){
			id.value = formId
			type.value = formType
		}
		if(formType == 'add'){
			isAdd.value = true
			formTitle.value = '新增' + formName
			formVisible.value = true
		}else if(formType == 'info'){
			isAdd.value = false
			formTitle.value = '查看' + formName
			getInfo()
		}else if(formType == 'edit'){
			isAdd.value = true
			formTitle.value = '修改' + formName
			getInfo()
		}
		else if(formType == 'cross'){
			isAdd.value = true
			formTitle.value = formNames
			// getInfo()
			for(let x in row){
				if(x=='shangpinmingcheng'){
					form.value.shangpinmingcheng = row[x];
					disabledForm.value.shangpinmingcheng = true;
					continue;
				}
				if(x=='waiguan'){
					form.value.waiguan = row[x];
					disabledForm.value.waiguan = true;
					continue;
				}
				if(x=='shangpinfenlei'){
					form.value.shangpinfenlei = row[x];
					disabledForm.value.shangpinfenlei = true;
					continue;
				}
				if(x=='pinpai'){
					form.value.pinpai = row[x];
					disabledForm.value.pinpai = true;
					continue;
				}
				if(x=='xinjiuchengdu'){
					form.value.xinjiuchengdu = row[x];
					disabledForm.value.xinjiuchengdu = true;
					continue;
				}
				if(x=='yuanchanchangjia'){
					form.value.yuanchanchangjia = row[x];
					disabledForm.value.yuanchanchangjia = true;
					continue;
				}
				if(x=='yongtu'){
					form.value.yongtu = row[x];
					disabledForm.value.yongtu = true;
					continue;
				}
				if(x=='juticaizhi'){
					form.value.juticaizhi = row[x];
					disabledForm.value.juticaizhi = true;
					continue;
				}
				if(x=='chanpinmiaoshu'){
					form.value.chanpinmiaoshu = row[x];
					disabledForm.value.chanpinmiaoshu = true;
					continue;
				}
				if(x=='price'){
					form.value.price = row[x];
					disabledForm.value.price = true;
					continue;
				}
				if(x=='onelimittimes'){
					form.value.onelimittimes = row[x];
					disabledForm.value.onelimittimes = true;
					continue;
				}
				if(x=='alllimittimes'){
					form.value.alllimittimes = row[x];
					disabledForm.value.alllimittimes = true;
					continue;
				}
				if(x=='maijiazhanghao'){
					form.value.maijiazhanghao = row[x];
					disabledForm.value.maijiazhanghao = true;
					continue;
				}
				if(x=='maijiaxingming'){
					form.value.maijiaxingming = row[x];
					disabledForm.value.maijiaxingming = true;
					continue;
				}
				if(x=='discussNumber'){
					form.value.discussNumber = row[x];
					disabledForm.value.discussNumber = true;
					continue;
				}
				if(x=='storeupNumber'){
					form.value.storeupNumber = row[x];
					disabledForm.value.storeupNumber = true;
					continue;
				}
			}
			if(row){
				crossRow.value = row
			}
			if(table){
				crossTable.value = table
			}
			if(tips){
				crossTips.value = tips
			}
			if(statusColumnName){
				crossColumnName.value = statusColumnName
			}
			if(statusColumnValue){
				crossColumnValue.value = statusColumnValue
			}
			form.value.price='0'
			form.value.onelimittimes='-1'
			form.value.alllimittimes='-1'
			form.value.sfsh='待审核'
			formVisible.value = true
		}

		context?.$http({
			url: `${context?.$toolUtil.storageGet('sessionTable')}/session`,
			method: 'get'
		}).then(res => {
			var json = res.data.data
			if(json.hasOwnProperty('yonghuzhanghao')&& context?.$toolUtil.storageGet("role")!="管理员"){
				form.value.maijiazhanghao = json.yonghuzhanghao
				disabledForm.value.maijiazhanghao = true;
			}
			if(json.hasOwnProperty('yonghuxingming')&& context?.$toolUtil.storageGet("role")!="管理员"){
				form.value.maijiaxingming = json.yonghuxingming
				disabledForm.value.maijiaxingming = true;
			}
		})
		context?.$http({
			url: `option/shangpinfenlei/shangpinfenlei`,
			method: 'get'
		}).then(res=>{
			shangpinfenleiLists.value = res.data.data
		})
	}
	//初始化
	//声明父级调用
	defineExpose({
		init
	})
	//关闭
	const closeClick = () => {
		formVisible.value = false
	}
	//富文本
	const editorChange = (e,name) =>{
		form.value[name] = e
	}
	//提交
	const save= async ()=>{
		if(form.value.waiguan!=null) {
			form.value.waiguan = form.value.waiguan.replace(new RegExp(context?.$config.url,"g"),"");
		}
		var table = crossTable.value
		var objcross = JSON.parse(JSON.stringify(crossRow.value))
		let crossUserId = ''
		let crossRefId = ''
		let crossOptNum = ''
		if(type.value == 'cross'){
			if(crossColumnName.value!=''){
				if(!crossColumnName.value.startsWith('[')){
					for(let o in objcross){
						if(o == crossColumnName.value){
							objcross[o] = crossColumnValue.value
						}
					}
					//修改跨表数据
					changeCrossData(objcross)
				}else{
					crossUserId = user.value.id
					crossRefId = objcross['id']
					crossOptNum = crossColumnName.value.replace(/\[/,"").replace(/\]/,"")
				}
			}
		}
		formRef.value.validate((valid)=>{
			if(valid){
				if(crossUserId&&crossRefId){
					form.value.crossuserid = crossUserId
					form.value.crossrefid = crossRefId
					let params = {
						page: 1,
						limit: 1000,
						crossuserid:form.value.crossuserid,
						crossrefid:form.value.crossrefid,
					}
					context?.$http({
						url: `${tableName}/page`,
						method: 'get',
						params: params
					}).then(res=>{
						if(res.data.data.total>=crossOptNum){
							context?.$toolUtil.message(`${crossTips.value}`,'error')
							return false
						}else{
							context?.$http({
								url: `${tableName}/${!form.value.id ? "save" : "update"}`,
								method: 'post',
								data: form.value
							}).then(async res=>{
								emit('formModelChange')
								context?.$toolUtil.message(`操作成功`,'success')
                                formVisible.value = false
							})
						}
					})
				}else{
					context?.$http({
						url: `${tableName}/${!form.value.id ? "save" : "update"}`,
						method: 'post',
						data: form.value
					}).then(async (res)=>{
						emit('formModelChange')
						context?.$toolUtil.message(`操作成功`,'success')
                        formVisible.value = false
					})
				}
			}else{
                context.$message.error('请完善信息')
            }
		})
	}
	//修改跨表数据
	const changeCrossData = async (row)=>{
        if(type.value == 'cross'){
            await context?.$http({
                url: `${crossTable.value}/update`,
                method: 'post',
                data: row
            }).then(res=>{})
        }
	}
</script>
<style lang="scss" scoped>
	// 表单
	.formModel_form{
		// form item
		:deep(.el-form-item) {
			//label
			.el-form-item__label {
			}
			// 内容盒子
			.el-form-item__content {
				// 输入框
				.list_inp {
				}
				// 下拉框
				.list_sel {
					//去掉默认样式
					.select-trigger{
						height: 100%;
						.el-input{
							height: 100%;
						}
					}
				}
				// 富文本
				.list_editor {
				}
				//图片上传样式
				.el-upload-list  {
					//提示语
					.el-upload__tip {
					}
					//外部盒子
					.el-upload--picture-card {
						//图标
						.el-icon{
						}
					}
					.el-upload-list__item {
					}
				}
			}
		}
	}
	// 按钮盒子
	.formModel_btn_box {
		.cancel_btn {
		}
		.cancel_btn:hover {
		}

		.confirm_btn {
		}
		.confirm_btn:hover {
		}
	}
</style>
