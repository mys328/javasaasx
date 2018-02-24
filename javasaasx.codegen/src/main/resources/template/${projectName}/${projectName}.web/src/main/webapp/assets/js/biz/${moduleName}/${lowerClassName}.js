<#include "/java_copyright.include"/>
<#assign className = table.className>
<#assign classPOName = table.className + 'Po'>
<#assign classBOName = table.className + 'Bo'>
<#assign classNameLower = className?uncap_first>


/** {table.remarks} 业务JS  */

/**
 * 编辑
 */
function edit(){

}


/**
 * 异步 右侧表格数据
 * @param table
 */
__table = null;
function ajaxRightDataTable(pid){
    //eg: http://www.gbtags.com/gb/rtwidget-replayerpreview/928.htm
    if(__table != null)
        __table.destroy();

    __table = $('#datatables').DataTable({
        scrollY: "400px",
        responsive: true,   //响应式
        paging: false,
        pagingType: "full_numbers",
        ordering: false,
        searching: false,
        retrieve: true,
        ajax: {
            "url": ctx+'/${moduleName}/${classNameLower}/ajaxButtomList?pid='+pid,
            "type": "POST"
        },
        bInfo: false,//不显示信息
        language: {
            "emptyTable": "未找到记录！",
            "loadingRecords": "请等待，数据正在加载中......",
        },
        columns: [
        <#list columnStyles as column>
            <#if column.isList=="1">
            {"data": "${column.javaColumn}"},
            </#if>
        </#list>
        ],
        "columnDefs": [<#assign index=0/>
        <#list columnStyles as column>
            <#if column.isList=="1">
            {
                "render": function(name, type, row, meta) {
                    return CommUtil.toText(row.${column.javaColumn}); //${column.desc}
                },"targets": ${index}
            },<#assign index=index+1 />
            </#if>
        </#list>
        ]
    });
}