//
//  ViewController.swift
//  Santander Twist
//
//  Created by Giovanni Aranda on 06/12/17.
//  Copyright © 2017 Hyperiondg. All rights reserved.
//

import UIKit
import WebKit
import CoreLocation
import Social

class ViewController: UIViewController,UIWebViewDelegate,UIScrollViewDelegate,WKNavigationDelegate,CLLocationManagerDelegate {

    @IBOutlet weak var webView: UIWebView!
    var faceLog:Int = 0
    var idface:String = ""
    var nameface:String = ""
    var emailface:String = ""
    var BUC:String = ""
    var x_pos:Bool = true
    var lat:String?
    var long:String?
    var code:Int?
    var variables_get = [String : String]()
    
    var locationManager = CLLocationManager()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view, typically from a nib.
        
        locationManager.delegate = self
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
        locationManager.requestWhenInUseAuthorization()
        locationManager.startUpdatingLocation()
        
        webView.delegate = self;
        webView.scrollView.delegate = self
        webView.scrollView.bounces = false
        
        if faceLog == 0{
            let URL = Bundle.main.url(forResource: "login", withExtension: "html", subdirectory: "assets")
            let request = NSURLRequest(url: URL!)
            webView.loadRequest(request as URLRequest)
        } else if faceLog == 1{
            // Code 101
            let url1 = Bundle.main.url(forResource: "mi_perfil", withExtension: "html", subdirectory: "assets")!
            let url2 = NSURL(string: "?buc=\(BUC.addingPercentEncoding(withAllowedCharacters: .urlHostAllowed)!)",relativeTo: url1)!
            let request = NSURLRequest(url: url2 as URL)
            
            self.webView.loadRequest(request as URLRequest)
            
        }else if faceLog == 2{
            // Code 202
            let url1 = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "assets")!
            let url2 = NSURL(string: "?slug=fb&qidFacebook=\(idface.addingPercentEncoding(withAllowedCharacters: .urlHostAllowed)!)&userName=\(nameface.addingPercentEncoding(withAllowedCharacters: .urlHostAllowed)!)&email=\(emailface		)",relativeTo: url1)!
            let request = NSURLRequest(url: url2 as URL)
            
            self.webView.loadRequest(request as URLRequest)
        }else if faceLog == 3{
            // Code 403
            let url1 = Bundle.main.url(forResource: "registro_face", withExtension: "html", subdirectory: "assets")!
            let str_ur = "?slug=fb&qidFacebook=\(idface.addingPercentEncoding(withAllowedCharacters: .urlHostAllowed)!)&userName=\(nameface.addingPercentEncoding(withAllowedCharacters: .urlHostAllowed)!)&email=\(emailface)"
           // print(str_ur)
            let url2 = NSURL(string: str_ur,relativeTo: url1)!
            let request = NSURLRequest(url: url2 as URL)
            
            self.webView.loadRequest(request as URLRequest)
        }
        
    }
    
    
    func scrollViewDidScroll(scrollView: UIScrollView) {
        
        if (scrollView.contentOffset.y >= scrollView.contentSize.height - scrollView.frame.size.height){
            scrollView.setContentOffset(CGPoint(x: scrollView.contentOffset.x, y: scrollView.contentSize.height - scrollView.frame.size.height), animated: false)
        }
        
        
    }
    
    
    
    func webView(_ webView: UIWebView, shouldStartLoadWith request: URLRequest, navigationType: UIWebViewNavigationType) -> Bool {
        
        let _req : String = request.url?.absoluteString ?? " "
        print(_req);
        
        let primer_separacion = _req.components(separatedBy: "//")
        let variables = primer_separacion[1].components(separatedBy: "&");
        
        
        if(_req.contains("loginfacebook")){
            
            let vc = self.storyboard?.instantiateViewController(withIdentifier: "face") as! FacebookViewController
            self.present(vc, animated: false, completion: nil)
            
        }
        
        if(_req.contains("alerta")){
            
            
            print("alerta");
        }
        
        if(_req.contains("geoloca")){
            rechargePage()
            
        }
        
        if(_req.contains("sharefb")){
            variables_get.removeAll()
            
            for variable in variables{
                let array = variable.components(separatedBy: "=")
                
                let key = String(array[0])
                let value = String(array[1])
                
                self.variables_get[key] = value
            }
            
            //self.mapa(lat: Double(variables_get["lat"]!)!,long: Double(variables_get["long"]!)!)
            self.share(titulo: variables_get["tit"]!,pl: variables_get["pl"]!)
            
        }
        
        if(_req.contains("chacheRemove")){
            
            rechargePage()
            
        }
        
        if(_req.contains("sharetwi")){
            variables_get.removeAll()
            
            for variable in variables{
                let array = variable.components(separatedBy: "=")
                
                let key = String(array[0])
                let value = String(array[1])
                
                self.variables_get[key] = value
            }
            
            self.share(titulo: variables_get["tit"]!,pl: variables_get["pl"]!)
        }
        
        if(_req.contains("sharewp")){
            var pl:String?
            for variable in variables{
                let array = variable.components(separatedBy: "=")
                
                pl = String(array[1])
            }
            
            self.sharewa(titulo: pl!)
        }
        
        if(_req.contains("consolelog")){
            var pl:String?
            for variable in variables{
                let array = variable.components(separatedBy: "=")
                
                pl = String(array[1])
            }
            print(pl!)
        }
        
        if(_req.contains("loginbuc")){
            
            var pl:String?
            for variable in variables{
                let array = variable.components(separatedBy: "=")
                pl = String(array[1])
            }
            
            let vc = self.storyboard?.instantiateViewController(withIdentifier: "face") as! FacebookViewController
            vc.BUC = pl!
            self.present(vc, animated: false, completion: nil)
        }
        
        return true;
    }
    
    func rechargePage(){
        let url1 = Bundle.main.url(forResource: "login", withExtension: "html", subdirectory: "assets")!
        let url2 = NSURL(string: "?lat=\(lat!)&long=\(long!)",relativeTo: url1)!
        let request = NSURLRequest(url: url2 as URL)
        
        self.webView.loadRequest(request as URLRequest)
    }
    
    func share(titulo:String,pl: String){
        let string:String = "\(titulo) https://santandertwist.com.mx/promotion/\(pl)";
        let url:NSURL = URL(string: "https://santandertwist.com.mx/promotion/\(pl)")! as NSURL
        let activityViewController = UIActivityViewController(activityItems: [string,url], applicationActivities: nil)
        self.present(activityViewController, animated: true, completion: nil)
    }

    
    func sharewa(titulo: String){
        let urlStr = titulo.addingPercentEncoding(withAllowedCharacters: NSCharacterSet.urlQueryAllowed)
        let url  = NSURL(string: "whatsapp://send?text=\(urlStr!)")
        if UIApplication.shared.canOpenURL(url! as URL) {
            UIApplication.shared.openURL(url! as URL)
        }
    }
    
    func  connection(_ connection: NSURLConnection, canAuthenticateAgainstProtectionSpace protectionSpace: URLProtectionSpace) -> Bool {
        return true
    }
    
    func connection(_ connection: NSURLConnection, didReceive challenge: URLAuthenticationChallenge) {
        challenge.sender?.use(URLCredential(trust: (challenge.protectionSpace.serverTrust)!), for: challenge)
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        let userLocation: CLLocation = locations[0]
        
        if x_pos{
          
            lat = String(format: "%f",userLocation.coordinate.latitude)
            long = String(format: "%f", userLocation.coordinate.longitude)
            x_pos = false
        }

    
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    


}
extension String
{
    func encodeUrl() -> String
    {
        return self.addingPercentEncoding( withAllowedCharacters: NSCharacterSet.urlQueryAllowed)!
    }
    func decodeUrl() -> String
    {
        return self.removingPercentEncoding!
    }
    
}

