/*
* Powered By [javasaasx]
* Web Site: http://solrhome.com
* Github Code: https://github.com/choudou5
* License：MIT
* Since 2018 - 2020
*/
package com.choudou5.javasaasx.service.dic;

import com.choudou5.javasaasx.base.bean.BaseBo;
import com.choudou5.javasaasx.base.service.BaseService;
import com.choudou5.javasaasx.service.dic.bo.DicSensitiveWordBo;

import java.util.List;

/**
 * @Name：敏感词库 接口
 * @Author：xuhaowen
 * @Date：2018-03-04
 */
public interface DicSensitiveWordService extends BaseService<DicSensitiveWordBo> {

    List<String> findAllWord();

}