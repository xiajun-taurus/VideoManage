<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                v-loading="loading"
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
                <el-table-column
                    label="ID"
                    prop="id">
                </el-table-column>
                <el-table-column
                    label="歌曲名称"
                    prop="name">
                </el-table-column>
                <el-table-column
                    label="作者"
                    prop="author">
                </el-table-column>
                <el-table-column
                    label="保存路径"
                    prop="path">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handlePlayClick(scope.$index, scope.row)">点我播放</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row, tableData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="limit"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getBgmList,delBgm} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                search: '',
                limit: 10,
                currentPage: 1,
                count: 0,
                loading: true
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.getBgms();
        },
        methods: {

            handleCurrentChange(val) {
                console.log(val)
                this.currentPage = val;
                this.getBgms()
            },
            async getBgms(){
                const bgms = await getBgmList({current: this.currentPage, size: this.limit});
                console.log(bgms)
                this.tableData = bgms.data.records
                this.count  = bgms.data.total
                this.currentPage = bgms.data.current
                this.loading = false
            },
            handlePlayClick(index, row) {
                console.log(index, row);
                const serverUrl = 'http://localhost:8085/'
                window.open(serverUrl+row.path,'_blank')
            },
            async handleDelete(index, row,tableData) {
                console.log(index, row);
                let result = await delBgm({id: row.id})
                if (result.status === 200){
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    tableData.splice(index, 1);
                    this.count --
                }
            }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
