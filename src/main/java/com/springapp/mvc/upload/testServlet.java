package com.springapp.mvc.upload;

/**
 * Created by xwq on 14-4-15.
 */

import com.xwq.common.model.DataShop;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.imageio.ImageIO;
import javax.script.ScriptContext;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@RequestMapping("/jpegcam_file")
public class testServlet {
    private static final int BUFFER_SIZE = 16 * 1024;

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    DataShop getShopInJSON(
            HttpServletRequest request
    ) throws Exception {
        DataShop dataShop = new DataShop();
        dataShop.setSuccess(true);

           String uploadPath = request.getSession().getServletContext().getRealPath("/static/upload/");
           ServletInputStream sis = request.getInputStream();
           String fileName = new SimpleDateFormat("yyyymmddhhmmss").format(new Date())+ ".JPEG";
           File txt = new File(uploadPath);
           File [] files =  txt.listFiles();
            for(File file : files)
            {
                file.delete();
            }

        BufferedImage tag = ImageIO.read(sis);
        tag.flush();
        boolean writerExists = ImageIO.write(tag, "JPEG", new File(uploadPath+"/"+fileName));
        ScriptContext response = null;
        PrintWriter out = (PrintWriter) response.getWriter();
        if (writerExists) {
            // 此处可以用request.getRequestURI();来代替
            out.println("http://localhost:8080/static/upload/"+fileName);
        } else {
            out.print("error");
        }
        out.flush();
        out.close();
        return dataShop;
    }
}
