<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\TextAuto;
use App\Form\TextAutoTypeFormType;
use Doctrine\Persistence\ManagerRegistry;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CollectionController extends AbstractController
{
    #[Route('/collection', name: 'app_collection')]
    public function index(Request $request,ManagerRegistry $doctrine): Response
    {
        $textAuto = new TextAuto();
        $form = $this->createForm(TextAutoTypeFormType::class, $textAuto);
        $form->handleRequest($request);
        // dump($form,$form->getExtraData(),$form->isValid());
        if ($form->isSubmitted() && $form->isValid()) {

            $em = $doctrine->getManager();
            $textAuto->setUser($this->getUser());
            $textAuto->setText($form->getExtraData()["text"]);
            $em->persist($textAuto);
            $em->flush();
            unset($form);
            $form = $this->createForm(TextAutoTypeFormType::class, $textAuto);
            return $this->redirectToRoute('app_collection');
            // return $this->render('collection/index.html.twig', [
            //     'controller_name' => 'CollectionController',
            //     "form" => $form->createView(),
            // ]);

        }
        return $this->render('collection/index.html.twig', [
            'controller_name' => 'CollectionController',
            "form" => $form->createView(),
        ]);
    }

    #[Route('/search', name: 'app_search')]
    public function search(Request $request,ManagerRegistry $doctrine): Response
    {
        $response = new Response();
        $value = $request->query->get("value");
        $cat = $request->query->get("cat");
        $result = $doctrine->getRepository(TextAuto::class)->search($value,$cat);
        $enc = "";
        $res = [];
        foreach ($result as $key => $value) {
            $enc = $value->jsonSerialize();
            array_push($res,$enc);
        }
        
        dump($enc,$res);die;
        $response->setContent(json_encode([
            "text" => $res
        ]));
        return $response;
    }
     
    #[Route('/cat', name: 'app_cat')]
    public function cat(Request $request,ManagerRegistry $doctrine): Response
    {
        $response = new Response();
        $result = $doctrine->getRepository(Category::class)->findAll();
        $enc = "";
        $res = [];
        foreach ($result as $key => $value) {
            $enc = $value->jsonSerialize();
            array_push($res,$enc);
        }
        
        // dump($res);die;
        $response->setContent(json_encode([
            "cat" => $res
        ]));
        return $response;
    }
}
