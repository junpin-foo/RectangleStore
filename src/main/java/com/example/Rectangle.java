package com.example;

public class Rectangle {
    private String Name;
    private String Colour;
    private Integer Width;
    private Integer Height;
    private String Message;
    private Integer ID;

    public String getName() {
        return this.Name;
    }

    public String getColour() {
        return this.Colour;
    }

    public String getMessage() {
        return this.Message;
    }

    public Integer getWidth() {
        return this.Width;
    }

    public Integer getHeight() {
        return this.Height;
    }

    public Integer getID() {
        return this.ID;
    }

    public void setName(String n) {
        this.Name = n;
    }

    public void setColour(String c) {
        this.Colour = c;
    }

    public void setMessage(String m) {
        this.Message = m;
    }

    public void setWidth(Integer w) {
        this.Width = w;
    }

    public void setHeight(Integer h) {
        this.Height = h;
    }

    public void setID(Integer i) {
        this.ID = i;
    }
}
