/*
* Powered By [javasaasx]
* Web Site: http://www.javasaas.top
* Github Code: https://github.com/choudou5
* License：MIT
* Since 2018 - 2020
*/
package com.choudou5.javasaasx.service.sys;

import com.choudou5.javasaasx.dao.sys.SysRoleDao;
import com.choudou5.javasaasx.dao.sys.po.SysRolePo;
import com.choudou5.javasaasx.service.sys.vo.SysRoleVo;
import com.choudou5.javasaasx.base.dao.BaseDao;
import com.choudou5.javasaasx.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Name：系统角色 Service实现类
 * @Author：xuhaowen
 * @Date：2018-06-03
 */
@Service("sysRoleService")
public class SysRoleService extends BaseService<SysRolePo, SysRoleVo>{

    @Autowired
    private SysRoleDao dao;

    @Override
    protected BaseDao getDao() {
        return dao;
    }

}
