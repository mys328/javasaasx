/*
* Powered By [javasaasx]
* Web Site: http://solrhome.com
* Github Code: https://github.com/choudou5
* License：MIT
* Since 2018 - 2020
*/
package com.choudou5.javasaasx.dao.log;

import com.choudou5.javasaasx.dao.orm.mybatis.MyBatisDao;
import com.choudou5.javasaasx.dao.log.po.SysUserLoginHiPo;
import com.choudou5.javasaasx.base.dao.BaseDao;

/**
 * @Name：系统用户登录记录 Dao
 * @Author：xuhaowen
 * @Date：2018-03-06
 */
@MyBatisDao
public interface SysUserLoginHiDao extends BaseDao<SysUserLoginHiPo, String> {

}