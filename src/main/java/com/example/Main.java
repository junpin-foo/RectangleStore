/*
 * Copyright 2002-2014 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.example;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Map;

@Controller
@SpringBootApplication
public class Main {

  @Value("${spring.datasource.url}")
  private String dbUrl;

  @Autowired
  private DataSource dataSource;

  public static void main(String[] args) throws Exception {
    SpringApplication.run(Main.class, args);
  }

  @RequestMapping("/")
  String index(Map<String, Object> model) {
    String name = "Bobby";
    model.put("name", name);
    return "home";
  }


  @GetMapping(
    path = "/rectangle"
  )
  public String getRecForm(Map<String, Object> model){
    Rectangle rec = new Rectangle();  // creates new person object with empty fname and lname
    model.put("rectangle", rec);
    return "rectangle";
  }

  @PostMapping(
    path = "/rectangle",
    consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE}
  )
  public String handleBrowserRecSubmit(Map<String, Object> model, Rectangle rec) throws Exception {
    // Save the red data into the database
    try (Connection connection = dataSource.getConnection()) {
      Statement stmt = connection.createStatement();
      stmt.executeUpdate("CREATE TABLE IF NOT EXISTS recs (id serial, Name varchar(20), Colour varchar(20), Message varchar(20), Width integer, Height integer)");
      String sql = "INSERT INTO recs (Name, Colour, Message, Width, Height) VALUES ('" + rec.getName() + "','" + rec.getColour() + "','" + rec.getMessage() + "','" + rec.getWidth() + "','" + rec.getHeight() + "')";
      stmt.executeUpdate(sql);
      System.out.println(rec.getName() + " " + rec.getColour());
      return "redirect:/rectangle/success";
    } catch (Exception e) {
      model.put("message", e.getMessage());
      return "error";
    }

  }

  @GetMapping("/View")
  public String updateDB(Map<String, Object> model) throws Exception{
    try (Connection connection = dataSource.getConnection()) {
      Statement stmt = connection.createStatement();
      stmt.executeUpdate("CREATE TABLE IF NOT EXISTS recs (id serial, Name varchar(20), Colour varchar(20), Message varchar(20), Width integer, Height integer)");
      ResultSet rs = stmt.executeQuery("SELECT * FROM recs");
  
      ArrayList<Rectangle> output2 = new ArrayList<Rectangle>();
      while(rs.next()){
        Rectangle output = new Rectangle();
        output.setName("" + rs.getObject("Name"));
        output.setColour("" + rs.getObject("Colour"));
        output.setMessage("" + rs.getObject("Message"));
        output.setWidth(rs.getInt("Width"));
        output.setHeight(rs.getInt("Height"));
        output.setID(rs.getInt("id"));

        output2.add(output);
      }  

      model.put("records", output2);
      return "View";
    }catch (Exception e) {
      model.put("message", e.getMessage());
      return "error";
    }
  }

  @GetMapping("/rectangle/success")
  public String getRecSuccess(){
    return "success";
  }

  @GetMapping("/profile/{id}")
  public String getProfile(@PathVariable("id") int recID, Map<String, Object> model){
    try (Connection connection = dataSource.getConnection()){
      Statement stmt = connection.createStatement();
      ResultSet rs = stmt.executeQuery("SELECT * FROM recs");
      
      while(rs.next()){
        if(recID == (rs.getInt("id"))){
          Rectangle output = new Rectangle();
          output.setName("" + rs.getObject("Name"));
          output.setColour("" + rs.getObject("Colour"));
          output.setMessage("" + rs.getObject("Message"));
          output.setWidth(rs.getInt("Width"));
          output.setHeight(rs.getInt("Height"));
          output.setID(rs.getInt("id"));
          model.put("ret", output);
        }
      }
      
      return "profile";

    }catch (Exception e) {
      model.put("message", e.getMessage());
      return "error";
    }
  }

  @PostMapping(
    path = "/DELETE/{id}",
    consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE}
  )
  public String handleDeleteButton(@PathVariable("id") int recID, Map<String, Object> model) throws Exception {
    try (Connection connection = dataSource.getConnection()) {
      Statement stmt = connection.createStatement();
      stmt.executeUpdate("DELETE FROM recs WHERE id=" + recID + ";");
      return "redirect:/rectangle/successD";
    } catch (Exception e) {
      model.put("message", e.getMessage());
      return "error";
    }

  }

  @GetMapping("/rectangle/successD")
  public String getRecSuccessDelete(){
    return "successD";
  }

  @Bean
  public DataSource dataSource() throws SQLException {
    if (dbUrl == null || dbUrl.isEmpty()) {
      return new HikariDataSource();
    } else {
      HikariConfig config = new HikariConfig();
      config.setJdbcUrl(dbUrl);
      return new HikariDataSource(config);
    }
  }

}
