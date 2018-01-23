package com.choudou5.javasaasx.service.gen.bo;

import com.choudou5.javasaasx.framework.bean.BaseBo;
import com.choudou5.javasaasx.framework.constant.CommonConstant;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import java.util.List;

/**
 * @Name：生成表字段样式 业务对象
 * @Author：xuhaowen
 * @Date：2018-01-17
 * @Site：http://solrhome.com
 * @License：MIT
 * @Copyright：xuhaowende@sina.cn (@Copyright 2018-2020)
 */
public class GenCodeBo implements BaseBo {

	private List<GenTableColumnStyleBo> columnStyleList;
    /**  表 */
	private String table;
    /**  开发者 */
	private String author;
    /**  模块名 */
	private String moduleName;

	public List<GenTableColumnStyleBo> getColumnStyleList() {
		return columnStyleList;
	}

	public void setColumnStyleList(List<GenTableColumnStyleBo> columnStyleList) {
		this.columnStyleList = columnStyleList;
	}

	@NotBlank(message="table不能为空")
	public String getTable() {
		return table;
	}

	public void setTable(String table) {
		this.table = table;
	}

	@NotBlank(message="开发者不能为空")
	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	@NotBlank(message="模块名不能为空")
	public String getModuleName() {
		return moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}

}
