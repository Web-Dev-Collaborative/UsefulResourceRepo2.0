package com.amitness.photon;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        if(id == R.id.id_about) {
            //Intent to another activity
            Intent intentAbout=new Intent(MainActivity.this,AboutActivity.class);
            startActivity(intentAbout);
            return true;
        }
        return true;
    }

    public void gotoTransmitActivity(View view) {
        Intent nextPage = new Intent(MainActivity.this, TransmitActivity.class);
        startActivity(nextPage);
    }

    public void gotoReceiveActivity(View view) {
        Intent nextPage = new Intent(MainActivity.this, ReceiveActivity.class);
        startActivity(nextPage);
    }
}
