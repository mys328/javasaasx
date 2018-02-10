package com.choudou5.javasaasx.web.controller.sys;

import com.choudou5.base.page.PageResult;
import com.choudou5.base.util.JsonUtil;
import com.choudou5.javasaasx.service.sys.SysMenuService;
import com.choudou5.javasaasx.service.sys.bo.SysMenuBo;
import com.choudou5.javasaasx.service.sys.bo.SysMenuQueryParam;
import com.choudou5.javasaasx.web.controller.BaseController;
import com.choudou5.javasaasx.web.util.RequestUtil;
import com.xiaoleilu.hutool.util.StrUtil;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * @Name：菜单表 Controller
 * @Author：xuhaowen
 * @Date：2018-01-18
 * @Site：http://solrhome.com
 * @License：MIT
 * @Copyright：xuhaowende@sina.cn (@Copyright 2018-2020)
 */
@Controller
@Scope("prototype")
@RequestMapping("/sys/sysMenu")
public class SysMenuController extends BaseController {

    @Autowired
    private SysMenuService sysMenuService;

    /**
     * 对象绑定（表单提交时）
     * @param id
     * @return
     */
    @ModelAttribute
    public SysMenuBo get(@RequestParam(required=false) String id) {
        if (StrUtil.isNotBlank(id)){
            return sysMenuService.get(id);
        }else{
            return new SysMenuBo();
        }
    }


    /**
     * 列表
     * @param queryParam
     * @param req
     * @param model
     * @return
     */
    @RequiresPermissions("sys:sysMenu:view")
    @RequestMapping(value = {"list", ""}, method = RequestMethod.GET)
    public String list(SysMenuQueryParam queryParam, HttpServletRequest req, Model model) {
        PageResult<SysMenuBo> pageResult = sysMenuService.findPage(queryParam);
        model.addAttribute("pageResult", pageResult);
        return "/sys/sysMenuListTree";
    }

    @RequiresPermissions("sys:sysMenu:view")
    @RequestMapping(value = {"ajaxParentTree"}, method = RequestMethod.GET)
    @ResponseBody
    public String ajaxParentTree(HttpServletRequest req, Model model) {
        int showLevel = RequestUtil.getIntParameter(req, "showLevel", 2);
        Map tree = sysMenuService.getParentTree(showLevel);
        return JsonUtil.toStr(new Object[]{tree});
    }


    /**
     * 查看
     * @param id
     * @param req
     * @param model
     * @return
     */
    @RequiresPermissions("sys:sysMenu:view")
    @RequestMapping(value = {"view"}, method = RequestMethod.GET)
    public String view(String id, HttpServletRequest req, Model model) {
        SysMenuBo sysMenuBo = sysMenuService.get(id);
        model.addAttribute("sysMenuBo", sysMenuBo);
        return "/sys/sysMenuView";
    }

    /**
     * 编辑记录
     * @param id
     * @param req
     * @param model
     * @return
     */
    @RequiresPermissions("sys:sysMenu:edit")
    @RequestMapping(value = "form", method = RequestMethod.GET)
    public String form(String id, HttpServletRequest req, Model model) {
        String pid = RequestUtil.getStrParameter(req, "pid");
        model.addAttribute("pid", pid);
        model.addAttribute("isShowParent", (StrUtil.isNotBlank(id) && StrUtil.isNotBlank(pid)));
        return "/sys/sysMenuForm";
    }

    /**
     * 保存记录
     * @param sysMenuBo
     * @param req
     * @param attributes
     * @return
     */
    @RequiresPermissions("sys:sysMenu:edit")
    @RequestMapping(value = "save", method = RequestMethod.POST)
    @ResponseBody
    public String save(SysMenuBo sysMenuBo, HttpServletRequest req, RedirectAttributes attributes) {
        //数据 验证
        if (!beanValidator(attributes, sysMenuBo))
            return returnFail(attributes);
        try {
            sysMenuService.save(sysMenuBo);
            return returnOK("保存成功！");
        } catch (Exception e) {
            return returnFail(e, "保存失败！");
        }
    }

    /**
     * 删除记录
     * @param id
     * @param req
     * @param attributes
     * @return
     */
    @RequiresPermissions("sys:sysMenu:delete")
    @RequestMapping(value = "delete", method = RequestMethod.POST)
    @ResponseBody
    public String delete(String id, HttpServletRequest req, RedirectAttributes attributes) {
        try {
            sysMenuService.delete(id);
            return returnOK("删除成功！");
        } catch (Exception e) {
            return returnFail(e, "删除失败！");
        }
    }

}
