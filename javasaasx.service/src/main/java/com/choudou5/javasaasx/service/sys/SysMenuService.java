/*
* Powered By [javasaasx]
* Web Site: http://www.javasaas.top
* Github Code: https://github.com/choudou5
* License：MIT
* Since 2018 - 2020
*/
package com.choudou5.javasaasx.service.sys;

import com.choudou5.base.exception.BizException;
import com.choudou5.base.mapper.BeanMapper;
import com.choudou5.base.util.AssertUtil;
import com.choudou5.base.util.StrUtil;
import com.choudou5.base.util.tree.TreeHelper;
import com.choudou5.javasaasx.base.constant.CommonConstant;
import com.choudou5.javasaasx.common.constants.SysConstants;
import com.choudou5.javasaasx.dao.sys.SysMenuDao;
import com.choudou5.javasaasx.dao.sys.po.SysMenuPo;
import com.choudou5.javasaasx.service.sys.vo.SysMenuQueryParam;
import com.choudou5.javasaasx.service.sys.vo.SysMenuVo;
import com.choudou5.javasaasx.base.dao.BaseDao;
import com.choudou5.javasaasx.service.BaseService;
import com.choudou5.javasaasx.service.util.SysExceptionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * @Name：菜单表 Service实现类
 * @Author：xuhaowen
 * @Date：2018-06-03
 */
@Service("sysMenuService")
public class SysMenuService extends BaseService<SysMenuPo, SysMenuVo>{

    @Autowired
    private SysMenuDao dao;

    @Override
    protected BaseDao getDao() {
        return dao;
    }


    public SysMenuVo get(Serializable id) {
        SysMenuVo bo =  super.get(id);
        if(bo == null && TreeHelper.ROOT_ID.equals(id)) {
            SysMenuVo newVo = new SysMenuVo();
            newVo.setId(TreeHelper.ROOT_ID);
            newVo.setPpath(TreeHelper.ROOT_ID);
            newVo.setDepth(0);
            return newVo;
        }
        return bo;
    }

    public void updateField(String id, String field, boolean flag) {
        dao.updateField(id, StrUtil.toUnderlineCase(field), flag?1:0);
    }

    @Transactional(readOnly = false)
    public void save(SysMenuVo bo, String[] perms) throws BizException {
        SysMenuPo po = BeanMapper.map(bo, SysMenuPo.class);
        try {
            if (po.isNew()){
                po.preInsert();
                formatParam(po);
                getDao().insert(po);
                //添加 权限
                if(SysConstants.MenuTypeEnum.MENU.getType().equals(po.getType())){
                    addPermList(po.getId(), po.getPermission(), perms);
                }
            }else{
                po.preUpdate();
                formatParam(po);
                getDao().update(po);
            }
        } catch (Exception e) {
            SysExceptionUtil.error("save fail", e);
            throw new BizException("保存失败", e);
        }
    }

    public void addPermList(String id, String permissionSuffix, String[] perms) throws BizException {
        for (String permName : perms) {
            SysMenuPo po = new SysMenuPo();
            po.setPid(id);
            po.preInsert();
            formatParam(po);
            po.setPermission(permissionSuffix + ":" + SysConstants.MenuPermEnum.getName(permName));
            po.setName(permName);
            po.setType(SysConstants.MenuTypeEnum.BUTTOM.getType());
            getDao().insert(po);
        }
    }

    /**
     * 格式化参数
     * @param po
     */
    private void formatParam(SysMenuPo po){
        if(StrUtil.isBlank(po.getPid())){
            po.setDepth(1);
            po.setPid(TreeHelper.ROOT_ID);
            po.setDepth(0);
        }else{
            SysMenuVo parent = get(po.getPid());
            po.setDepth(parent.getDepth() + 1);
            if(StrUtil.isBlank(parent.getPpath()))
                po.setPpath(parent.getId());
            else
                po.setPpath(parent.getPpath()+"."+po.getId());
        }
        po.setIsMobileShow(CommonConstant.DataStatusEnum.getCodeByCheckBoxOrRadio(po.getIsMobileShow(), CommonConstant.STATUS_N));
        po.setIsSysData(CommonConstant.DataStatusEnum.getCodeByCheckBoxOrRadio(po.getIsSysData(), CommonConstant.STATUS_Y));
        po.setStatus(CommonConstant.DataStatusEnum.getCodeByCheckBoxOrRadio(po.getStatus(), CommonConstant.STATUS_Y));
    }

    public Map<String, Object> getParentTree() {
        SysMenuVo bo = new SysMenuVo();
        bo.setType(SysConstants.MenuTypeEnum.MENU.getType());
        SysMenuQueryParam queryParam = new SysMenuQueryParam(bo);
        List<SysMenuVo> list = findList(queryParam);
        Map<String, Object> tree = TreeHelper.buildTreeData(list, "菜单管理");
        return tree;
    }

    public List<SysMenuVo> findButtomList(String pid) {
        SysMenuVo bo = new SysMenuVo();
        bo.setPid(pid);
        bo.setType(SysConstants.MenuTypeEnum.BUTTOM.getType());
        SysMenuQueryParam queryParam = new SysMenuQueryParam(bo);
        return findList(queryParam);
    }

    @Transactional(readOnly=false)
    @Override
    public void logicDeleteById(String id) throws BizException {
        AssertUtil.isEmpty(findMenuListByPid(id), "存在子菜单，禁止删除");
        dao.logicDeleteByPid(id);
        super.logicDeleteById(id);
    }

    public List<SysMenuVo> findMenuListByPid(String pid) throws BizException {
        SysMenuVo bo = new SysMenuVo();
        bo.setPid(pid);
        bo.setType(SysConstants.MenuTypeEnum.MENU.getType());
        SysMenuQueryParam queryParam = new SysMenuQueryParam(bo);
        return findList(queryParam);
    }
}
