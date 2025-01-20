package com.search.be.realtime_data;

import java.io.IOException;
import org.jsoup.Jsoup;
import org.jsoup.Connection;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;


public class test {
    public static void main(String args[]){
        // 1. 수집 대상 URL
        String URL = "https://www.naver.com/";
        String selector = ".area_hotkeyword .ah_k";

        try {
            // 2. Connection 생성
            Document doc = Jsoup.connect(URL).get();
            org.jsoup.select.Elements titles = doc.select(selector);


            // 3. 날짜
            Date dt = new Date();
            SimpleDateFormat format = new SimpleDateFormat("YYYYMMDD");

            // 4. HTML 출력
            System.out.println("Naver 실시간 검색어 20("+format.format(dt)+")");

            int i=0;
            for(Element element: titles) {
                System.out.println((++i)+"위 "+element.text());
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
