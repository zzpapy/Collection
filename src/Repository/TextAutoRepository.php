<?php

namespace App\Repository;

use App\Entity\TextAuto;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<TextAuto>
 *
 * @method TextAuto|null find($id, $lockMode = null, $lockVersion = null)
 * @method TextAuto|null findOneBy(array $criteria, array $orderBy = null)
 * @method TextAuto[]    findAll()
 * @method TextAuto[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TextAutoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TextAuto::class);
    }

    public function add(TextAuto $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(TextAuto $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

   /**
    * @return TextAuto[] Returns an array of TextAuto objects
    */
   public function search($value,$cat,$id): array
   {
       $res =  $this->createQueryBuilder('t')
       ->andWhere('t.text LIKE :val')
       ->orWhere('t.title LIKE :val')
       ->andWhere('t.type = :cat')
       ->andWhere('t.User = :id')
       ->setParameter('val', '%'.$value.'%')
       ->setParameter('cat', $cat)
       ->setParameter('id', $id)
       ->orderBy('t.id', 'ASC')
       ->getQuery()
       ->getResult()
       ;
    //    dump($res);die;
       return $res;
   }

    /**
    * @return TextAuto[] Returns an array of TextAuto objects
    */
    public function findtext($id): array
    {
        $res =  $this->createQueryBuilder('t')
       
        ->andWhere('t.User = :id')
        ->setParameter('id', $id)
        ->orderBy('t.id', 'ASC')
        ->getQuery()
        ->getResult()
        ;
        // dump($res);die;
        return $res;
    }

   /**
    * @return TextAuto[] Returns an array of TextAuto objects
    */
    public function cat(): array
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.text LIKE :val')       
            ->getQuery()
            ->getResult()
        ;
    }

//    public function findOneBySomeField($value): ?TextAuto
//    {
//        return $this->createQueryBuilder('t')
//            ->andWhere('t.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
