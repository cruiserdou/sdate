package com.springapp.mvc.upload;

/**
 * Created by xwq on 14-4-15.
 */

import com.xwq.common.model.DataShop;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;

@Controller
@RequestMapping("/upload_file_img")
public class UploadFileImg {
    private static final int BUFFER_SIZE = 16 * 1024;

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            HttpServletRequest request,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) throws Exception {
        DataShop dataShop = new DataShop();
        dataShop.setSuccess(true);

        if (!file.isEmpty()) {
            String projectPath = request.getSession().getServletContext().getRealPath("/static/upload/");
            file.transferTo(new File(projectPath + "/" + file.getOriginalFilename()));
        }



        return dataShop;
    }
}
